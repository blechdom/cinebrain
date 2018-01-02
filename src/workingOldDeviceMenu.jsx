import React from 'react';
import ReactDOM from 'react-dom'
import _ from "lodash";
import 'isomorphic-fetch';
import { Col, Row, FormGroup, FormControl, ControlLabel, Button, Table, Panel, Glyphicon } from 'react-bootstrap';
import Toast from './Toast.jsx';


const DeviceRow = (props) => {
  return (
      <option value={props.device.device_number}>{props.device.name}</option>
  );
};

DeviceRow.propTypes = {
  device: React.PropTypes.object.isRequired,
};

function DeviceTable(props) {
  const deviceRows = props.devices.map(device =>
    <DeviceRow key={device._id} device={device} />
  );
  return (
      	<FormControl componentClass="select"
              onChange={props.onDeviceSelect}>
		{deviceRows}
	</FormControl>
  );
}

DeviceTable.propTypes = {
  devices: React.PropTypes.array.isRequired,
  onDeviceSelect: React.PropTypes.func.isRequired,
  };

export default class NewControllers extends React.Component {

  static dataFetcher({ urlBase, location }) {
    return fetch(`${urlBase || ''}/api/devices${location.search}`).then(response => {
      if (!response.ok) return response.json().then(error => Promise.reject(error));
      return response.json().then(data => ({ NewControllers: data }));
    });
  }

  constructor(props, context){
    super(props, context);
    const devices = context.initialState.NewControllers ? context.initialState.NewControllers.records : [];
    this.state = {
      devices,
      toastVisible: false,
      toastMessage: '',
      toastType: 'success',
  };
  this.onAddButton = this.onAddButton.bind(this);
  this.showError = this.showError.bind(this);
  this.dismissToast = this.dismissToast.bind(this); 
}
componentDidMount() {
    this.loadData();
  }

  componentDidUpdate(prevProps) {
    const oldQuery = prevProps.location.query;
    const newQuery = this.props.location.query;
    if (oldQuery.status === newQuery.status
        && oldQuery.effort_gte === newQuery.effort_gte
        && oldQuery.effort_lte === newQuery.effort_lte) {
      return;
    }
    this.loadData();
  }
 showError(message) {
    this.setState({ toastVisible: true, toastMessage: message, toastType: 'danger' });
  }

  dismissToast() {
    this.setState({ toastVisible: false });
  }

  loadData() {
    NewControllers.dataFetcher({ location: this.props.location })
    .then(data => {
      const devices = data.NewControllers.records;
      devices.forEach(device => {
        device.created = new Date(device.created);
        if (device.completionDate) {
          device.completionDate = new Date(device.completionDate);
        }
      });
      this.setState({ devices });
    }).catch(err => {
      this.showError(`Error in fetching data from server: ${err}`);
    });
  }

  onAddButton() {

	 console.log("adding ", "button " + this.state.buttonCounter);
  }
render() {
  return (
      <div>
	 <DeviceTable devices={this.state.devices} onDeviceSelect={this.onAddButton} />
	 <Toast
          showing={this.state.toastVisible} message={this.state.toastMessage}
          onDismiss={this.dismissToast} bsStyle={this.state.toastType}
        />
     </div>
    );
  }
}
NewControllers.propTypes = {
  location: React.PropTypes.object.isRequired,
  router: React.PropTypes.object,
};

NewControllers.contextTypes = {
  initialState: React.PropTypes.object,
}; 
