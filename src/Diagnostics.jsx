import React from 'react';
import 'isomorphic-fetch';
import { Link } from 'react-router';
import { Button, Glyphicon, Table, Panel } from 'react-bootstrap';
import { SocketProvider } from 'socket.io-react';
const {string, bool, object} = React.PropTypes;
import SocketIOClient from 'socket.io-client';
let socket;

export default class Diagnostics extends React.Component {
 
constructor(props){
    	super(props);
	this.state = {
		text: '',
	}
}
componentDidMount() {
	socket = SocketIOClient();
	socket.on(this.props.location.pathname, (mesg) => {
		this.setState({text: mesg});
	});
}
componentWillUnmount() {
	socket.off(this.props.page);
}
sendSocketData() {
  console.log("socket button pressed");
  socket.emit('diagnostics-button', 'Hello world!');
}
 render() {
  return (
<div><div>{this.state.text}</div>
  <Button onClick={this.sendSocketData}>Send Socket Data</Button>
</div>
	);
  };
}

