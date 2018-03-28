import React from 'react';
import {Responsive, WidthProvider} from 'react-grid-layout';
import ReactDOM from 'react-dom'
import _ from "lodash";
import 'isomorphic-fetch';
import {Row, Col, Button} from 'react-bootstrap';
import { SocketProvider } from 'socket.io-react';
import SocketIOClient from 'socket.io-client';

let socket;

export default class Decklink extends React.Component {

  constructor(props, context){
    super(props, context);
    this.state = {
      deck1_response: '',
      deck2_response: '',
      deck3_response: '',
    };
    this.handleButtons = this.handleButtons.bind(this);
  }
handleButtons(event) {
  console.log(event.target.id + ': ' + event.target.value);
  switch (event.target.value) {
  
  case 'deck1_rec':
      this.setState({deck1_response: "Starting to Record..."});
     socket.emit('deck1', "rec");
    break;
  case 'deck1_stop':
    this.setState({deck1_response: "Stopping..."}); 
     socket.emit('deck1', "stop");
    break;
  case 'deck2_rec':
    this.setState({deck2_response: "Starting to Record..."});
     socket.emit('deck2', "rec");
    break;
  case 'deck2_stop':
    this.setState({deck2_response: "Stopping..."}); 
     socket.emit('deck2', "stop");
    break;
  case 'deck3_rec':
    this.setState({deck3_response: "Starting to Record..."});
     socket.emit('deck3', "rec");
    break;
  case 'deck3_stop':
    this.setState({deck3_response: "Stopping..."}); 
     socket.emit('deck3', "stop");
    break;

  default:
    console.log('ERROR: Button does not exist');
  }
} 

render() {
  return (
    <div>
      <center>
        <div><h3>DECKLINK VIDEO RECORDERS</h3></div>
        <div>
        <div><h4>Deck 1</h4>
          <button className='btn-block btn btn-danger' width="50%" value='deck1_rec' onClick={this.handleButtons}>RECORD</button>
          <button className='btn-block btn btn-warning'  width="50%" value='deck1_stop' onClick={this.handleButtons}>STOP</button>
           <div>DECK 1 STATUS: {this.state.deck1_response}</div>
        </div>
        </div>

        <div>
        <div><h4>Deck 2</h4>
          <button className='btn-block btn btn-danger' width="50%" value='deck2_rec' onClick={this.handleButtons}>RECORD</button>
          <button className='btn-block btn btn-warning'  width="50%" value='deck2_stop' onClick={this.handleButtons}>STOP</button>
           <div>DECK 2 STATUS: {this.state.deck2_response}</div>
        </div>
        </div>

        <div>
        <div><h4>Deck 3</h4>
          <button className='btn-block btn btn-danger' width="50%" value='deck3_rec' onClick={this.handleButtons}>RECORD</button>
          <button className='btn-block btn btn-warning'  width="50%" value='deck3_stop' onClick={this.handleButtons}>STOP</button>
           <div>DECK 3 STATUS: {this.state.deck3_response}</div>
        </div>
        </div>
       
      </center>
     </div>
    );
  }
  componentWillUnmount() {
    socket.off(this.props.page);
  }
  componentDidMount() {
    let deck1Response = '';
    let deck2Response = '';
    let deck3Response = '';
    socket = SocketIOClient();
    socket.on('deck1_rec_status', (mesg) => {
      if(Number(mesg.code) == 200) {
        deck1Response = 'Deck 1 RECORDING';
      }
      console.log("deck1 recording " + Number(mesg.code));
      this.setState({deck1_response: JSON.stringify(mesg)}); 
    });
    socket.on('deck1_stop_status', (mesg) => {
      if(Number(mesg.code) == 200) {
        deck1Response = 'Deck 1 STOPPED';
      }
      console.log("deck1 stop " + Number(mesg.code));
      this.setState({deck1_response: JSON.stringify(mesg)}); 
    });
    socket.on('deck2_rec_status', (mesg) => {
      if(Number(mesg.code) == 200) {
        deck1Response = 'Deck 2 RECORDING';
      }
      console.log("deck2 recording " + Number(mesg.code));
      this.setState({deck2_response: JSON.stringify(mesg)}); 
    });
    socket.on('deck2_stop_status', (mesg) => {
      if(Number(mesg.code) == 200) {
        deck1Response = 'Deck 2 STOPPED';
      }
      console.log("deck2 stop " + Number(mesg.code));
      this.setState({deck2_response: JSON.stringify(mesg)}); 
    });
    socket.on('deck3_rec_status', (mesg) => {
      if(Number(mesg.code) == 200) {
        deck1Response = 'Deck 3 RECORDING';
      }
      console.log("deck3 recording " + Number(mesg.code));
      this.setState({deck3_response: JSON.stringify(mesg)}); 
    });
    socket.on('deck3_stop_status', (mesg) => {
      if(Number(mesg.code) == 200) {
        deck1Response = 'Deck 3 STOPPED';
      }
      console.log("deck3 stop " + Number(mesg.code));
      this.setState({deck3_response: JSON.stringify(mesg)}); 
    });
    console.log("deck1Response " + deck1Response);
    console.log("deck2Response " + deck2Response);
    console.log("deck3Response " + deck3Response);
    this.setState({deck1_response: deck1Response});
    this.setState({deck2_response: deck2Response});
    this.setState({deck3_response: deck3Response});

  }
}
