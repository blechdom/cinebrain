import SourceMapSupport from 'source-map-support';
SourceMapSupport.install();
import 'babel-polyfill';
import http from 'http';
import { MongoClient } from 'mongodb';
import socketio from 'socket.io';
import telnet from 'telnet-client';
import DMX from './dmx_usb_pro.js';
import dgram from 'dgram';
import emptyFunction from 'fbjs/lib/emptyFunction';
import ATEM from 'applest-atem/lib/atem.js';
import easymidi from 'easymidi/index.js';
import Agenda from 'agenda';
import HyperdeckLib from 'hyperdeck-js-lib';
//import five from 'johnny-five';
import {CasparCG} from 'casparcg-connection';


var agenda = new Agenda({db: {address: 'mongodb://127.0.0.1/cinebrain', collection: 'agenda'}});
agenda.on('ready', function() {
  console.log("Agenda locked and loaded");
  agenda.start();
});

//let boardMega = new five.Board();
//let boardUno = new five.Board();
/*
board.on("ready", function() {
  
  console.log("arduino board ready");
  
});*/

var hyperdeck1 = new HyperdeckLib.Hyperdeck("192.168.1.245");
var hyperdeck2 = new HyperdeckLib.Hyperdeck("192.168.1.208");
var hyperdeck3 = new HyperdeckLib.Hyperdeck("192.168.1.57");

let atem1me = new ATEM();
let atemTV1 = new ATEM();
let atemTV2 = new ATEM();

//atem1me.connect('192.168.10.240');
atemTV1.connect('192.168.10.240');
//atemTV2.connect('192.168.10.242');
var midiOutA;
//var midiOutA = new easymidi.Output('MIDIPLUS TBOX 2x2 1');

let appModule = require('./server.js');
let db;
let server;
let websocket;
let UDPserver;
let UDPclient;

//const {CasparCG} = require("casparcg-connection");
 
//var casparConnection = new CasparCG();
//casparConnection.play(2, 1, "group2_loop1.mov");


const PTZ_init = Buffer.from('020000010000000001', 'hex');
const PTZ_network_setting = Buffer.from('02045d4b9d2eceff1921680102ff255255255000ffrobocam2ff03', 'hex');
const PTZ_change_IP_Enquiry = Buffer.from('02454e513a6e6574776f726b03ff', 'hex');
const PTZ_change_IP = Buffer.from('024d41433a30342d35642d34622d39642d32652d6365FF49504144523a3139322e3136382e31302e323030FF4d41534b3a3235352e3235352e302e30FF4e414d453a43414d4552413031FF03', 'hex');
const PTZ_camera_on = Buffer.from('010000060000000c8101040002ff', 'hex');
const PTZ_camera_off = Buffer.from('010000060000000c8101040003ff', 'hex');

//atemTV1.on('connect', function() {     
 
MongoClient.connect('mongodb://localhost/cinebrain').then(connection => {
  db = connection;
  server = http.createServer();
  appModule.setDb(db);
  server.on('request', appModule.app);
  server.listen(80, () => {
    console.log('App started on port 80');
  });


  let current_universe_buffer = new Buffer(512);
  let dmx_usb_pro, current_universe;

  db.collection('last_known_universe', function (err, collection) {
    collection.findOne({ _id: "last_known_universe" }, { dmx_data: 1, _id:0 }, function (err, result) {
      console.log("result " + JSON.stringify(result));
      current_universe = result.dmx_data; 
      console.log("current_universe is " + JSON.stringify(current_universe.data));
      current_universe_buffer = Buffer(current_universe.data);
      dmx_usb_pro = new DMX('COM4', current_universe_buffer);
    });
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


/*boardMega.on("ready", function() {
//  console.log("arduino board Mega ready");
 // var servoWrist = new five.Servo(8);
 // var servoElbow = new five.Servo(9);
 // var servoShoulder = new five.Servo(12);
 // var servoBase = new five.Servo(11);

 


    var servoThumb = new five.Servo(8);
    var servoPointer = new five.Servo(9);
    var servoMiddle = new five.Servo(10);
    var servoRing = new five.Servo(11);
    var servoPinky = new five.Servo(12);

*/
 /* db.collection('last_known_robot_state', function (err, collection) {
    collection.findOne({ _id: "last_known_robot_state" }, { robot_data: 1, _id:0 }, function (err, result) {
      console.log("last known robot state result " + JSON.stringify(result));
          servoWrist.to(Number(result.robot_data[0]));
          servoElbow.to(Number(result.robot_data[1]));
          servoShoulder.to(Number(result.robot_data[2]));
          servoBase.to(Number(result.robot_data[3]));
  
  });
  });*/
  

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
        socket.on('atem1me_changeProgramInput', (message) => {
                console.log("received atem 1 m/e program input command: " + message);
                atem1me.changeProgramInput(message);
        });
        socket.on('atem1me_changePreviewInput', (message) => {
                console.log("received atem 1 m/e preview input command: " + message);
                atem1me.changePreviewInput(message);
        });
        socket.on('atemTV1_changeProgramInput', (message) => {
                console.log("received atem TV 1 program input command: " + message);
                atemTV1.changeProgramInput(message);
        });
        socket.on('atemTV1_changePreviewInput', (message) => {
                console.log("received atem TV 1 preview input command: " + message);
                atemTV1.changePreviewInput(message);
        });
        socket.on('atemTV1_transition_position', (message) => {
                console.log("received atem TV 1 preview input command: " + message);
                atemTV1.changeTransitionPosition(message);
        });
         socket.on('atemTV1_autoTransition', (message) => {
                console.log("received atem TV 1 preview input command: " + message);
                atemTV1.autoTransition();
        });
          socket.on('atemTV1_transitionType', (message) => {
                console.log("received atem TV 1 preview input command: " + message);
                atemTV1.changeTransitionType(message);
        });
        socket.on('atemTV2_changeProgramInput', (message) => {
                console.log("received atem TV 2 program input command: " + message);
                atemTV2.changeProgramInput(message);
        });
        socket.on('atemTV2_changePreviewInput', (message) => {
                console.log("received atem TV 2 preview input command: " + message);
                atemTV2.changePreviewInput(message);
        });
         socket.on('atem1me_runMacro', (message) => {
                console.log("received atem 1 m/e preview input command: " + message);
                    atem1md.runMacro(2);
                    atem1me.runMacro(message);
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
                dmx_usb_pro.update(buffer.dmx, buffer.offset);
                console.log("dmx-go: " + JSON.stringify(buffer.dmx));
                console.log("dmx_usb_pro: " + JSON.stringify(dmx_usb_pro.universe));
                let updated_dmx = JSON.stringify(dmx_usb_pro.universe);
                db.collection('last_known_universe').save({_id:"last_known_universe", dmx_data:JSON.parse(updated_dmx.toString())});
        });     
        socket.on('dmx-all', (buffer) => {
                dmx_usb_pro.updateAll(buffer);
        });
        socket.on('dmx-save-preset', (data) => {
          db.collection('dmx_presets').update({instrument_id:data.instrument_id, preset_num: data.preset_num, dmx_offset: data.dmx_offset}, data, {upsert: true});
        }); 
        socket.on('dmx-load-preset', (data) => {
        
          db.collection('dmx_presets', function (err, collection) {
            collection.findOne({instrument_id: data.instrument_id, preset_num: data.preset_num, dmx_offset: data.dmx_offset}, function (err, result) {
                socket.emit('dmx-load-preset-data', result.dmx_data);
                let DMXArray = result.dmx_data;
                let DMXObject = {};
                for (var i = 0, len = DMXArray.length; i < len; i++) {
                  DMXObject[i+1] = DMXArray[i];
                }
                dmx_usb_pro.update(DMXObject, result.dmx_offset);
            });
          });
          console.log("dmx_usb_pro: " + JSON.stringify(dmx_usb_pro.universe));
        });  

     /*   socket.on('robot-go-wrist', (buffer) => {
             console.log("wrist: " + buffer);
             servoWrist.to(Number(buffer));
        });
        socket.on('robot-go-elbow', (buffer) => {
             console.log("elbow: " + buffer);
             servoElbow.to(Number(buffer));
        });
        socket.on('robot-go-shoulder', (buffer) => {
             console.log("shoulder: " + buffer);
             servoShoulder.to(Number(buffer));
        });
        socket.on('robot-go-base', (buffer) => {
             console.log("base: " + buffer);
             servoBase.to(Number(buffer));
        });

        socket.on('robot-go-thumb', (buffer) => {
             console.log("thumb: " + buffer);
             servoThumb.to(Number(buffer));
        });
        socket.on('robot-go-pointer', (buffer) => {
             console.log("pointer: " + buffer);
             servoPointer.to(Number(buffer));
        });
        socket.on('robot-go-middle', (buffer) => {
             console.log("middle: " + buffer);
             servoMiddle.to(Number(buffer));
        });
        socket.on('robot-go-ring', (buffer) => {
             console.log("ring: " + buffer);
             servoRing.to(Number(buffer));
        });
        socket.on('robot-go-pinky', (buffer) => {
             console.log("pinky: " + buffer);
             servoPinky.to(Number(buffer));
        });
        socket.on('last-known-robot-state', (buffer) => {
            console.log("robot_data: " + JSON.stringify(buffer));
            db.collection('last_known_robot_state').save({_id:"last_known_robot_state", robot_data:buffer});
        
        });
           
        socket.on('robot-save-preset', (data) => {
          db.collection('robot_presets').update({preset_num: data.preset_num}, data, {upsert: true});
        }); 
        socket.on('robot-load-preset', (data) => {
        
          db.collection('robot_presets', function (err, collection) {
            collection.findOne({preset_num: data.preset_num}, function (err, result) {
                socket.emit('robot-load-preset-data', result.robot_data);
                servoWrist.to(Number(result.robot_data[0]));
                servoElbow.to(Number(result.robot_data[1]));
                servoShoulder.to(Number(result.robot_data[2]));
                servoBase.to(Number(result.robot_data[3]));
               
            });
          });
         
        });  
*/
socket.on('deck1', (data) => {
            hyperdeck1.onConnected().then(function() {

            switch (data) {
              case 'rec':
                hyperdeck1.record().then(function(response){
                  socket.emit('deck1_rec_status', response);
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
          }).catch(function() {
            console.error("Failed to connect to hyperdeck 1.");
             socket.emit('deck1_stop_status', "Failed to connect to hyperdeck 1.");
          });
        });
        socket.on('deck2', (data) => {
            hyperdeck2.onConnected().then(function() {

            switch (data) {
              case 'rec':
                hyperdeck2.record().then(function(response){
                  socket.emit('deck2_rec_status', response);
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
          }).catch(function() {
            console.error("Failed to connect to hyperdeck 2.");
            socket.emit('deck2_stop_status', "Failed to connect to hyperdeck 2.");
          });
        });
        socket.on('deck3', (data) => {
            hyperdeck3.onConnected().then(function() {

            switch (data) {
              case 'rec':
                hyperdeck3.record().then(function(response){
                  socket.emit('deck3_rec_status', response);
                });
                break;
              case 'stop':
                hyperdeck3.stop().then(function(response){
                  socket.emit('deck3_stop_status', response);
                });
                break;
              default:
                console.log('ERROR: HYPERDECK 3 command unknown');
            }
          }).catch(function() {
            console.error("Failed to connect to hyperdeck 3.");
            socket.emit('deck3_stop_status', "Failed to connect to hyperdeck 3.");
          });
        });

        socket.on('ptz-go', function(data) {
                let UDPmessage = Buffer.from(data.buffer, 'hex');
                UDPclient.send(PTZ_init, data.port, data.host, (err) => {
                  UDPclient.send(UDPmessage, data.port, data.host, (err) => {
                  console.log("send message " + data.buffer + " err: " + err);
                  });
                });
        });     
         socket.on('midi-noteon', function(data) {
           console.log("sending midi noteon: " + data.note + " velocity: " + data.velocity + " on channel: " + data.channel);
              
              midiOutA.send('noteon', {
                note: data.note,
                velocity: data.velocity,
                channel: data.channel
              });
        });
         socket.on('midi-noteoff', function(data) {
           console.log("sending midi noteoff: " + data.note + " velocity: " + data.velocity + " on channel: " + data.channel);
              
              midiOutA.send('noteoff', {
                note: data.note,
                velocity: data.velocity,
                channel: data.channel
              });
        });
         /*
        socket.on('midi-cc', function(data) {
           console.log("sending midi cc change-cc#: " + data.controller + " cc-value: " + data.value + " on channel: " + data.channel);
              
              midiOutA.send('cc', {
                controller: data.controller,
                value: data.value,
                channel: data.channel
              });
        });
        socket.on('midi-program', function(data) {
              console.log("sending midi program change-program#: " + data.number + " on channel: " + data.channel);
              midiOutA.send('program', {
                number: data.number,
                channel: data.channel
              });
        });
*/

        socket.on('agenda-list-jobs', function(data) {
                console.log("getting jobs list");
               agenda.jobs({}, function(err, jobs) {
                 console.log("jobs: " + JSON.stringify(jobs));
                 socket.emit("agenda-list", jobs);
               });
         });    

        socket.on('get-casparconnection-cls', function(data) {
                console.log("getting caspar connection cls");


                var ccg = new CasparCG({onConnected: function(e){
                  ccg.cls().then((response) => {
                    console.log(response);
                    socket.emit("receive-casparconnection-cls", response);
                  }).catch((error) => {
                    console.error(error)
                  })
                  }});

         });    

       socket.on('agenda-create-job', function(data) {
                console.log("creating new job " + JSON.stringify(data));
               agenda.define(data.name, function(job, done) {
                    console.log(data.name + " new Job happening");
                    done();
                });
              agenda.schedule(new Date(data.date), data.name, {clip: data.clip, duration: data.duration});
              agenda.jobs({}, function(err, jobs) {
                 console.log("jobs: " + JSON.stringify(jobs));
                 socket.emit("agenda-list", jobs);
               });
        });  
         socket.on('delete-job', function(data) {
              const ObjectID = require('mongodb').ObjectID;
              const query = {
                _id: ObjectID(data)
              };

              agenda.cancel(query, (err, numRemoved) => {
                if (err) {
                  console.log(err);
                } else {
                  console.log(`removed ${numRemoved} jobs`);
                  agenda.jobs({}, function(err, jobs) {
                 console.log("jobs: " + JSON.stringify(jobs));
                 socket.emit("agenda-list", jobs);
               });
                }
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
//});

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