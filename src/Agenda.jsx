import React from 'react';
import ReactDOM from 'react-dom'
import _ from "lodash";
import 'isomorphic-fetch';
import {Row, Col, Button, Glyphicon, Table, Panel} from 'react-bootstrap';
import { SocketProvider } from 'socket.io-react';
import SocketIOClient from 'socket.io-client';
import Toast from './Toast.jsx';

let socket;

export default class Agenda extends React.Component {

  constructor(props, context){
    super(props, context);
    this.state = {
      agenda_list: [],
  };
  this.handleButtons = this.handleButtons.bind(this);
  this.handleNumberInput = this.handleNumberInput.bind(this);
}

handleButtons(event) {
  console.log(event.target.id + ': ' + event.target.value);

  switch (event.target.value) {
  
  case 'push-record':
     //socket.emit('agenda-create-job', {});
    break;
  default:
    console.log('ERROR: Button does not exist');
  }
} 
handleNumberInput(event) {
  console.log(event.target.id + ': ' + event.target.value);
  let input_value = event.target.value;
  switch (event.target.id) {
    case 'Schedule Event':
      socket.emit('agenda-schedule-event', {number:input_value, channel:0});
      break;
    default:
  console.log('ERROR: Input does not exist');
  }
}

render() {
  return (
      <div>
        <strong>Caspar Scheduler</strong>
        <Table bordered condensed hover responsive>
          <thead>
            <tr>
              <th>Id</th>
              <th>Status</th>
              <th>Owner</th>
              <th>Created</th>
              <th>Effort</th>
              <th>Completion Date</th>
              <th>Title</th>
              <th></th>
            </tr>
          </thead>
          <tbody>{this.state.agenda_list}</tbody>
        </Table>
      </div>
    );
  }
  componentWillUnmount() {
    socket.off(this.props.page);
  }
  componentDidMount() {
    socket = SocketIOClient();
    socket.on('agenda-list', (jobs) => {
      jobs.forEach(job => {

      });
      this.setState({agenda_list: jobs});
    });
    socket.emit('agenda-list-jobs', {});
  }
}