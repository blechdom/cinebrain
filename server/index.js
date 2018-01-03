import SourceMapSupport from 'source-map-support';
SourceMapSupport.install();
import 'babel-polyfill';
import http from 'http';
import { MongoClient } from 'mongodb';
import socketio from 'socket.io';
import telnet from 'telnet-client';



function runTelnet(command) {
	var connection = new telnet();

	var params = {
  		host: '127.0.0.1',
  		port: 5250,
  		timeout: 1500,
  		negotiationMandatory: false,
  		ors: '\r\n', // mandatory for your 'send' to work
  		waitfor: '\n' // mandatory for your 'send' to work (set those either here or in your exec_params!)
	};
	connection.on('connect', function() {
  		connection.send(command, function(err, res) {
    			if (err) return err

    			console.log('first message:', res.trim())

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

//let net = require("net");
//({TelnetSocket} = require("telnet-stream"));

let appModule = require('./server.js');
let db;
let server;
let websocket;

//let telSocket = net.createConnection(5250, "localhost");

//let tSocket = new TelnetSocket(telSocket);

//console.log("Telnet-Stream started on port 5250"); 

 // tSocket.on("close", function() {
 //   console.log("Telnet Socket Closed");
 //   return process.exit();
  //});


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
    	socket.on('parameter-menu', (buffer) => {
                console.log("the parameter packet is: " + buffer);
                
              //runTelnet('play 1-0 amb.mp4');
           	runTelnet('cls');
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


