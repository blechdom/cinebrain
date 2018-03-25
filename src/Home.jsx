import React from 'react';
import 'isomorphic-fetch';
import { Link } from 'react-router';
import { Button, Glyphicon, Table, Panel } from 'react-bootstrap';
import { SocketProvider } from 'socket.io-react';
import SocketIOClient from 'socket.io-client';

let socket;

export default class Home extends React.Component {

  constructor(props, context){
    super(props, context);
    this.state = {};
  	this.handleButtons = this.handleButtons.bind(this);
  }
  componentWillUnmount() {
    socket.off(this.props.page);
  }
  componentDidMount() {
    socket = SocketIOClient();
    socket.on('dmx-load-preset-data', (data) => {
      this.setState({dmx_data: data});
      console.log("preset retrieved " + this.state.dmx_data);
    });
  }
	handleButtons(event) {
  		console.log(event.target.id + ': ' + event.target.value);
  
		switch (event.target.value) {
  
  			case 'cst_on':
     			console.log("CST ON");
     			const loadCSTPreset = {
      				instrument_id: 'kcat_dmx', dmx_offset: 1, preset_num: 1, dmx_data: [0,0,0,0,0,0,0,0,0,0,0,0],
  				};
  				socket.emit('dmx-load-preset', loadCSTPreset);
    		break;
    		case 'cst_off':
     			console.log("CST OFF");
     			socket.emit('dmx-all', 0);
    		break;
    		case 'tott_on':
     			console.log("TOTT ON");
     			const loadTOTTPreset = {
      				instrument_id: 'kcat_dmx', dmx_offset: 1, preset_num: 2, dmx_data: [0,0,0,0,0,0,0,0,0,0,0,0],
  				};
  				socket.emit('dmx-load-preset', loadTOTTPreset);
    		break;
    		case 'tott_off':
     			console.log("TOTT OFF");
     			socket.emit('dmx-all', 0);
    		break;
    		case 'deck_all_rec':
     			console.log("RECORD ALL");
     			socket.emit('deck1', "rec");
     			socket.emit('deck2', "rec");
     			socket.emit('deck3', "rec");
    		break;
    		case 'deck_all_stop':
     			console.log("STOP ALL");
     			socket.emit('deck1', "stop");
     			socket.emit('deck2', "stop");
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
	  <div><h1>KCAT: Cinebrain</h1></div>
	  <div><h2>Community Story Telling</h2>
	  	<button className='btn-block btn btn-success' width="50%" value='cst_on' onClick={this.handleButtons}>ON</button>
	  	<button className='btn-block btn btn-danger'  width="50%" value='cst_off' onClick={this.handleButtons}>OFF</button>
	  </div>
	  <div><h2>Talk of the Town</h2>
	  	<button className='btn-block btn btn-success'  width="50%" value='tott_on' onClick={this.handleButtons}>ON</button>
	  	<button className='btn-block btn btn-danger'  width="50%" value='tott_off' onClick={this.handleButtons}>OFF</button>
	 
	  </div>
	  <div><h2>RECORD</h2>
	  	<button className='btn-block btn btn-danger' width="50%" value='deck_all_rec' onClick={this.handleButtons}>RECORD</button>
        <button className='btn-block btn btn-warning'  width="50%" value='deck_all_stop' onClick={this.handleButtons}>STOP</button>
	  </div>
  	</center>
  </div>
	);
  };
}
