import SourceMapSupport from 'source-map-support';
SourceMapSupport.install();
import 'babel-polyfill';
import http from 'http';
import { MongoClient } from 'mongodb';
import socketio from 'socket.io';


let appModule = require('./server.js');
let db;
let server;
let websocket;

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
	socket.on('diagnostics-button', (message) => {
                console.log("and the message is: " + message);
        });
	socket.on('device-menu', (message) => {
                console.log("the device number is: " + message);
        	websocket.sockets.emit("show-parameters", message);
	});
    	socket.on('parameter-menu', (message) => {
                console.log("the parameter packet is: " + message);
        });
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


