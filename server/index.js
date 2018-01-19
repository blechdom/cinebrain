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

const PTZ_camera_on = Buffer.from('010000060000000c8101040002ff', 'hex');
const PTZ_camera_off = Buffer.from('010000060000000c8101040003ff', 'hex');


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

  UDPclient.send(PTZ_init, 52381, '192.168.0.100', (err) => {
    console.log("send message " + PTZ_init + " err: " + err);
    UDPclient.send(PTZ_camera_on, 52381, '192.168.0.100', (err) => {
      console.log("send message " + PTZ_camera_on + " err: " + err);
    });
  });


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
                  console.log("send message " + PTZ_init + " err: " + err);
                  UDPclient.send(UDPmessage, data.port, data.host, (err) => {
                  console.log("send message " + UDPmessage + " err: " + err);
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

if (module.hot) {
  module.hot.accept('./server.js', () => {
    server.removeListener('request', appModule.app);
    appModule = require('./server.js');     // eslint-disable-line
    appModule.setDb(db);
    server.on('request', appModule.app);
  });
}










