import SourceMapSupport from 'source-map-support';
SourceMapSupport.install();
import 'babel-polyfill';
import http from 'http';
import { MongoClient } from 'mongodb';
import socketio from 'socket.io';
import telnet from 'telnet-client';
import DMX from 'dmx';
import dgram from 'dgram';
import emptyFunction from 'fbjs/lib/emptyFunction';
import ATEM from 'applest-atem/lib/atem.js';

let atem = new ATEM();
atem.connect('192.168.10.240');

if (atem.connect('192.168.10.240')){
  console.log("atem connected to 192.168.10.240");
}
else {
    console.log("cannot connect to atem at 192.168.10.240"); 
}
  
//atem.on('connect', function() {
  // atem.changeProgramInput(1);
  // atem.changePreviewInput(2);
  // atem.autoTransition();
 //setTimeout(function() {
   // atem.changeProgramInput(1);
    //atem.startRecordMacro(98, 'Test Macro', 'Hey! This is macroman.');
    // atem.sendAudioLevelNumber()
 // }, 5000)

//});

// atem.on('stateChanged', function(err, state) {
  // console.log(state.audio.master); // catch the ATEM state.
// });
// console.log(atem.state); // or use this.



let appModule = require('./server.js');
let db;
let server;
let websocket;
let UDPserver;
let UDPclient;

let dmx = new DMX();
let universe = dmx.addUniverse('demo', 'enttec-usb-dmx-pro', 'COM3')

let on = false;

const PTZ_init = Buffer.from('020000010000000001', 'hex');
const PTZ_network_setting = Buffer.from('02045d4b9d2eceff1921680102ff255255255000ffrobocam2ff03', 'hex');
const PTZ_change_IP_Enquiry = Buffer.from('02454e513a6e6574776f726b03ff', 'hex');
const PTZ_change_IP = Buffer.from('024d41433a30342d35642d34622d39642d32652d6365FF49504144523a3139322e3136382e31302e323030FF4d41534b3a3235352e3235352e302e30FF4e414d453a43414d4552413031FF03', 'hex');
const PTZ_camera_on = Buffer.from('010000060000000c8101040002ff', 'hex');
const PTZ_camera_off = Buffer.from('010000060000000c8101040003ff', 'hex');

//atem.on('connect', function() {
                 
 
MongoClient.connect('mongodb://localhost/cinebrain').then(connection => {
  db = connection;
  server = http.createServer();
  appModule.setDb(db);
  server.on('request', appModule.app);
  server.listen(80, () => {
    console.log('App started on port 80');
  });

  UDPserver = dgram.createSocket('udp4');
  UDPclient = dgram.createSocket('udp4');

  UDPserver.on('error', (err) => {
  console.log(`UDP server error:\n${err.stack}`);
  UDPserver.close();
  });

  UDPserver.on('message', (msg, rinfo) => {
    console.log(`UDP server got: ${msg} from ${rinfo.address}:${rinfo.port}`);
  });

  UDPserver.on('listening', () => {
    const address = '192.168.10.101';
    console.log(`UDP server listening ${address.address}:${address.port}`);
  });

  /*UDPclient.send(PTZ_init, 52381, '192.168.0.100', (err) => {
    console.log("send message " + PTZ_init + " err: " + err);
    UDPclient.send(PTZ_camera_on, 52381, '192.168.0.100', (err) => {
      console.log("send message " + PTZ_camera_on + " err: " + err);
    });
  });
*/
 /* UDPclient.send(PTZ_network_setting, 52380, '192.168.0.100', (err) => {
    console.log("send message err: " + err);
  });
*/
  UDPserver.bind(62455);

  websocket = socketio(server);
  websocket.on('connection', (socket) => {
        console.log("user connected from: " + socket.id);

        socket.on('disconnect', () => {
                console.log('user disconnected')
        });
        socket.on('diagnostics-send-telnet', function(data) {
                console.log("received telnet command: " + data.host + ":" + data.port + "-->" + data.command);
                runTelnet(data.host, data.port, data.command);
        });
        socket.on('control-interface-send-telnet', function(data) {
                console.log("received telnet command: " + data.host + ":" + data.port + "-->" + data.command);
                runTelnet(data.host, data.port, data.command);
        });
        socket.on('atem_changeProgramInput', (message) => {
                console.log("received atem program input command: " + message);
                  atem.on('connect', function() {
                    atem.changeProgramInput(message);
                  });
        });
        socket.on('atem_changePreviewInput', (message) => {
                console.log("received atem preview input command: " + message);
                  atem.on('connect', function() {
                    atem.changePreviewInput(message);
                  });
        });
         socket.on('atem_runMacro', (message) => {
                console.log("received atem preview input command: " + message);
                   atem.on('connect', function() {
                    atem.runMacro(2);
                    atem.runMacro(message);
                  });
        });
        socket.on('device-menu', (message) => {
          console.log("the device number is: " + message);
          websocket.sockets.emit("show-parameters", message);
        });
        socket.on('parameter-menu', (buffer) => {
                console.log("the parameter packet is: " + buffer);
                websocket.sockets.emit("show-parameter-inputs", buffer);
        }); 
        socket.on('dmx-go', (buffer) => {
                universe.update(buffer);
        });     
        socket.on('dmx-all', (buffer) => {
                universe.updateAll(buffer);
        });     
        socket.on('ptz-go', function(data) {
                let UDPmessage = Buffer.from(data.buffer, 'hex');
                UDPclient.send(PTZ_init, data.port, data.host, (err) => {
                  UDPclient.send(UDPmessage, data.port, data.host, (err) => {
                  console.log("send message " + data.buffer + " err: " + err);
                  });
                });
        });     



        const telnetHost = '127.0.0.1';
        const telnetPort = 5250;

        function runTelnet(telnetHost, telnetPort, command) {
          var connection = new telnet();

          var params = {
              host: telnetHost,
              port: telnetPort,
              timeout: 1500,
              negotiationMandatory: false,
              ors: '\r\n', 
              waitfor: '\n' 
          };
          connection.on('connect', function() {
              connection.send(command, function(err, res) {
                  if (err) return err

                  console.log('first message:', res.trim())

                  telnetResponse(res);

                  connection.send('', {
                      ors: '\r\n',
                      waitfor: '\n'
                  }, function(err, res) {
                    if (err) return err

                      console.log('resp after cmd:', res)
                  })
              })
          })

          connection.connect(params)
        }

        function telnetResponse (res) {
          websocket.sockets.emit("telnet-response", res);
        }
  });
}).catch(error => {
  console.log('ERROR:', error);
});

//});

if (module.hot) {
  module.hot.accept('./server.js', () => {
    server.removeListener('request', appModule.app);
    appModule = require('./server.js');     // eslint-disable-line
    appModule.setDb(db);
    server.on('request', appModule.app);
  });
}










