import React from 'react';
import ReactDOM from 'react-dom';
import _ from "lodash";
import 'isomorphic-fetch';
import FormControl from 'react-bootstrap';
import SocketIOClient from 'socket.io-client';
let socket;

export default class DeviceMenu extends React.Component {

  static dataFetcher({ urlBase, location }) {
    return fetch(`${urlBase || ''}/api/devices${location.search}`).then(response => {
      if (!response.ok) return response.json().then(error => Promise.reject(error));
      return response.json().then(data => ({ DeviceMenu: data }));
    });
  }

  constructor(props, context){
    super(props, context);
    const devices = context.initialState.DeviceMenu ? context.initialState.DeviceMenu.records : [];
    this.deviceOptions = [];
    this.state = {
      devices,
    };
    this.onAddButton = this.onAddButton.bind(this);
}
componentDidMount() {
        socket = SocketIOClient();
        socket.on(this.props.location.pathname, (mesg) => {
                this.setState({text: mesg});
        });
    	this.loadData();
  }

  loadData() {
    DeviceMenu.dataFetcher({ location: this.props.location })
    .then(data => {
      const devices = data.DeviceMenu.records;
      devices.forEach(device => {
	this.deviceOptions.push(<option key={device._id} value={device.device_number}>{device.name}</option>);

      });
      this.setState({ devices });
    }).catch(err => {
      this.showError(`Error in fetching data from server: ${err}`);
    });
  }

  onAddButton(event) {
	 console.log("adding ", "button " + event.target.value);
  	socket.emit("diagnostic-button", event.target.value);
  }
  render() {
    return (
	<div>
		<FormControl componentClass="select" onChange={this.onAddButton}>
                	{this.deviceOptions}
        	</FormControl>
	</div>
    );
  }
}
DeviceMenu.propTypes = {
  location: React.PropTypes.object.isRequired,
  router: React.PropTypes.object,
};

DeviceMenu.contextTypes = {
  initialState: React.PropTypes.object,
}; 
