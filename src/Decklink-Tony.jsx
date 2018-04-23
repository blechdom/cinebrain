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
    };
    this.handleButtons = this.handleButtons.bind(this);
  }
handleButtons(event) {
  console.log(event.target.id + ': ' + event.target.value);
  switch (event.target.value) {
  
  case 'decks_play':
      this.setState({deck1_response: "Starting to Play..."});
     socket.emit('deck1', "play");
       this.setState({deck2_response: "Starting to Play..."});
     socket.emit('deck2', "play");
    break;
  case 'decks_stop':
    this.setState({deck1_response: "Stopping..."}); 
     socket.emit('deck1', "stop");
      this.setState({deck2_response: "Stopping..."}); 
     socket.emit('deck2', "stop");
     break;
  case 'deck1_play':
      this.setState({deck1_response: "Starting to Play..."});
     socket.emit('deck1', "play");
    break;
  case 'deck1_stop':
    this.setState({deck1_response: "Stopping..."}); 
     socket.emit('deck1', "stop");
     break;
  case 'deck2_play':
    this.setState({deck2_response: "Starting to Play..."});
     socket.emit('deck2', "play");
    break;
  case 'deck2_stop':
    this.setState({deck2_response: "Stopping..."}); 
     socket.emit('deck2', "stop");
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
        <div><h4>ALL DECKS</h4>
          <button className='btn-block btn btn-success' width="50%" value='decks_play' onClick={this.handleButtons}>PLAY ALL</button>
          <button className='btn-block btn btn-warning'  width="50%" value='decks_stop' onClick={this.handleButtons}>STOP ALL</button>
           <div>DECK 1 STATUS: {this.state.deck1_response}</div>
            <div>DECK 2 STATUS: {this.state.deck2_response}</div>
        </div>
        </div>
        <div>
        <div><h4>Deck 1</h4>
          <button className='btn-block btn btn-success' width="50%" value='deck1_play' onClick={this.handleButtons}>PLAY</button>
          <button className='btn-block btn btn-warning'  width="50%" value='deck1_stop' onClick={this.handleButtons}>STOP</button>
           <div>DECK 1 STATUS: {this.state.deck1_response}</div>
        </div>
        </div>
        <div>
        <div><h4>Deck 2</h4>
          <button className='btn-block btn btn-success' width="50%" value='deck2_play' onClick={this.handleButtons}>PLAY</button>
          <button className='btn-block btn btn-warning'  width="50%" value='deck2_stop' onClick={this.handleButtons}>STOP</button>
           <div>DECK 2 STATUS: {this.state.deck2_response}</div>
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
    socket = SocketIOClient();
    socket.on('deck1_play_status', (mesg) => {
      if(Number(mesg.code) == 200) {
        deck1Response = 'Deck 1 PLAYING';
      }
      console.log("deck1 playing" + Number(mesg.code));
      this.setState({deck1_response: "play: " + JSON.stringify(mesg)}); 
    });
    socket.on('deck1_stop_status', (mesg) => {
      if(Number(mesg.code) == 200) {
        deck1Response = 'Deck 1 STOPPED';
      }
      console.log("deck1 stop " + Number(mesg.code));
      this.setState({deck1_response: "stop: " + JSON.stringify(mesg)}); 
    });
    socket.on('deck2_play_status', (mesg) => {
      if(Number(mesg.code) == 200) {
        deck1Response = 'Deck 2 RECORDING';
      }
      console.log("deck2 playing " + Number(mesg.code));
      this.setState({deck2_response: "play: " + JSON.stringify(mesg)}); 
    });
    socket.on('deck2_stop_status', (mesg) => {
      if(Number(mesg.code) == 200) {
        deck1Response = 'Deck 2 STOPPED';
      }
      console.log("deck2 stop " + Number(mesg.code));
      this.setState({deck2_response: "stop: " + JSON.stringify(mesg)}); 
    });
   
    console.log("deck1Response " + deck1Response);
    console.log("deck2Response " + deck2Response);
  
    this.setState({deck1_response: deck1Response});
    this.setState({deck2_response: deck2Response});
 
  }
}
