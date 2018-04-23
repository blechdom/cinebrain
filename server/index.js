import SourceMapSupport from 'source-map-support';
SourceMapSupport.install();
import 'babel-polyfill';
import http from 'http';
import socketio from 'socket.io';
import emptyFunction from 'fbjs/lib/emptyFunction';
import HyperdeckLib from 'hyperdeck-js-lib';

var hyperdeck1 = new HyperdeckLib.Hyperdeck("192.168.1.233");
var hyperdeck2 = new HyperdeckLib.Hyperdeck("1.168.10.18");
var Logger = HyperdeckLib.Logger;
Logger.setLevel(Logger.DEBUG);
Logger.setLevel(Logger.INFO);
Logger.setLevel(Logger.WARN);
Logger.setLevel(Logger.ERROR);
//var hyperdeck2 = new HyperdeckLib.Hyperdeck("1.168.10.18");

let appModule = require('./server.js');
let db;
let server;
let websocket;

  server = http.createServer();
  server.on('request', appModule.app);
  server.listen(80, () => {
    console.log('App started on port 80');
  });


  websocket = socketio(server);
  websocket.on('connection', (socket) => {
   
        console.log("user connected from: " + socket.id);

        socket.on('disconnect', () => {
                console.log('user disconnected')
        });
 hyperdeck1.onConnected().then(function() {
            console.log("hyperdeck1 connected");
              hyperdeck1.makeRequest("device info").then(function(response) {
                console.log("Got response with code "+response.code+".");
                console.log("Hyperdeck unique id: "+response.params["unique id"]);
              }).catch(function(errResponse) {
                if (!errResponse) {
                  console.error("The request failed because the hyperdeck connection was lost.");
                }
                else {
                  console.error("The hyperdeck returned an error with status code "+errResponse.code+".");
                }
              });
           
              hyperdeck1.getNotifier().on("asynchronousEvent", function(response) {
                console.log("Got an asynchronous event with code "+response.code+".");
              });
           
              hyperdeck1.getNotifier().on("connectionLost", function() {
                console.error("Connection lost.");
              });
         

        socket.on('deck1', (data) => {
          console.log("deck 1 command received: " + data);
          
            switch (data) {
              case 'play':
              console.log("playing hyperdeck1");
                hyperdeck1.play().then(function(response){
                  socket.emit('deck1_play_status', response);
                });
                break;
              case 'stop':
                hyperdeck1.stop().then(function(response){
                  socket.emit('deck1_stop_status', response);
                });
                break;
              default:
                console.log('ERROR: HYPERDECK 1 command unknown');

            }
     
        });
          }).catch(function() {
            console.error("Failed to connect to hyperdeck 1.");
             socket.emit('deck1_stop_status', "Failed to connect to hyperdeck 1.");
          }); 
hyperdeck2.onConnected().then(function() {
            console.log("hyperdeck2 connected");
              hyperdeck2.makeRequest("device info").then(function(response) {
                console.log("Got response with code "+response.code+".");
                console.log("Hyperdeck unique id: "+response.params["unique id"]);
              }).catch(function(errResponse) {
                if (!errResponse) {
                  console.error("The request failed because the hyperdeck2 connection was lost.");
                }
                else {
                  console.error("The hyperdeck2 returned an error with status code "+errResponse.code+".");
                }
              });
           
              hyperdeck2.getNotifier().on("asynchronousEvent", function(response) {
                console.log("Got an asynchronous event with code "+response.code+".");
              });
           
              hyperdeck2.getNotifier().on("connectionLost", function() {
                console.error("Connection lost.");
              });
         

        socket.on('deck2', (data) => {
          console.log("deck 2 command received: " + data);
          
            switch (data) {
              case 'play':
              console.log("playing hyperdeck2");
                hyperdeck2.play().then(function(response){
                  socket.emit('deck2_play_status', response);
                });
                break;
              case 'stop':
                hyperdeck2.stop().then(function(response){
                  socket.emit('deck2_stop_status', response);
                });
                break;
              default:
                console.log('ERROR: HYPERDECK 2 command unknown');

            }
     
        });
          }).catch(function() {
            console.error("Failed to connect to hyperdeck 2.");
             socket.emit('deck2_stop_status', "Failed to connect to hyperdeck 2.");
          }); 
  });
 

if (module.hot) {
  module.hot.accept('./server.js', () => {
    server.removeListener('request', appModule.app);
    appModule = require('./server.js');     // eslint-disable-line
  //  appModule.setDb(db);
    server.on('request', appModule.app);
  });
}