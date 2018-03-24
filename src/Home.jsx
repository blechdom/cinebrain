import React from 'react';
import 'isomorphic-fetch';
import { Link } from 'react-router';
import { Button, Glyphicon, Table, Panel } from 'react-bootstrap';

export default class Home extends React.Component {

	constructor(props, context){
    super(props, context);
    this.state = {};
  	this.handleButtons = this.handleButtons.bind(this);
	}
	handleButtons(event) {
  		console.log(event.target.id + ': ' + event.target.value);
  
		switch (event.target.value) {
  
  			case 'cst_on':
     			console.log("CST ON");
    		break;
    		case 'cst_off':
     			console.log("CST OFF");
    		break;
    		case 'tott_on':
     			console.log("TOTT ON");
    		break;
    		case 'tott_off':
     			console.log("TOTT OFF");
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
  	</center>
  </div>
	);
  };
}
