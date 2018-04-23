import React from 'react';
import ReactDOM from 'react-dom'
import _ from "lodash";
import 'isomorphic-fetch';
import {Row, Col, Button} from 'react-bootstrap';
import { SocketProvider } from 'socket.io-react';
import SocketIOClient from 'socket.io-client';

let socket;

export default class VideoGroup1 extends React.Component {

  constructor(props, context){
    super(props, context);
    this.state = {
      lock: true,
      host: '127.0.0.1',
      port: 5250,
      command: "",
      response: '',
  };

  this.handleButtons = this.handleButtons.bind(this);

}

handleButtons(event) {
  console.log(event.target.id + ': ' + event.target.value);
    socket.emit('control-interface-send-telnet', { host: this.state.host, port: this.state.port, command: "MIXER 1-0 VOLUME 0.0"});
  switch (event.target.value) {
  case 'vid_stop':
     socket.emit('control-interface-send-telnet', { host: this.state.host, port: this.state.port, command: 'STOP 1-0'});
     socket.emit('control-interface-send-telnet', { host: this.state.host, port: this.state.port, command: 'STOP 2-0'});
    break;
   case 'vid_start':
     socket.emit('control-interface-send-telnet', { host: this.state.host, port: this.state.port, command: 'PLAY 1-0 CV2_1 LOOP'});
    socket.emit('control-interface-send-telnet', { host: this.state.host, port: this.state.port, command: 'PLAY 2-0 GAZE2_1 LOOP'});
   
    break;
  default:
    console.log('ERROR: Button does not exist');
  }
} 

render() {
  return (
      <div><div>
        <button className="btn btn-success" value="vid_start" onClick={this.handleButtons}>start</button>
         <button className="btn btn-danger" value="vid_stop" onClick={this.handleButtons}>stop</button>
     </div>
     <div>{this.state.response}</div>
     </div>
    );
  }
  componentWillUnmount() {
    socket.off(this.props.page);
  }
  componentDidMount() {
    socket = SocketIOClient();
    socket.on('telnet-response', (mesg) => {
      this.setState({response: mesg});
    });
}
}

