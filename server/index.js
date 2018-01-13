import SourceMapSupport from 'source-map-support';
SourceMapSupport.install();
import 'babel-polyfill';
import http from 'http';
import { MongoClient } from 'mongodb';
import socketio from 'socket.io';
import telnet from 'telnet-client';
import DMX from 'dmx';

let appModule = require('./server.js');
let db;
let server;
let websocket;

let dmx = new DMX();
let universe = dmx.addUniverse('demo', 'enttec-usb-dmx-pro', 'COM3')

let on = false;

MongoClient.connect('mongodb://localhost/cinebrain').then(connection => {
  db = connection;
  server = http.createServer();
  appModule.setDb(db);
  server.on('request', appModule.app);
  server.listen(3000, () => {
    console.log('App started on port 3000');
  });
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










