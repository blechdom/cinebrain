import React from 'react';
import 'isomorphic-fetch';
import { Link } from 'react-router';
import {NavItem, Row, Col, Button, Glyphicon, Table, Panel, Modal, Form, FormGroup, ButtonToolbar, FormControl, ControlLabel,} from 'react-bootstrap';
import { SocketProvider } from 'socket.io-react';
import SocketIOClient from 'socket.io-client';
import FaTrash from 'react-icons/lib/fa/trash';

let socket;

const JobRow = (props) => {
  function onDeleteClick() {
    props.deleteJob(props.job._id);
  }

  return (
    <tr>
      <td>{props.job.name}</td>
      <td>{props.job.type}</td>
      <td>{props.job.data}</td>
      <td>{props.job.priority}</td>
      <td>{props.job.repeatInterval}</td>
      <td>{props.job.nextRunAt}</td>
      <td>{props.job.lastRunAt}</td>
      <td>{props.job.lastFinishedAt}</td>
      <td>
        <Button bsSize="xsmall" onClick={onDeleteClick}><FaTrash /></Button>
      </td>
    </tr>
  );
};

JobRow.propTypes = {
  job: React.PropTypes.object.isRequired,
  deleteJob: React.PropTypes.func.isRequired,
};

function JobTable(props) {
  const jobRows = props.jobs.map(job =>
    <JobRow key={job._id} job={job} deleteJob={props.deleteJob} />
  );
  return (
    <Table bordered condensed hover responsive>
      <thead>
        <tr>
          <th>Name</th>
          <th>Type</th>
          <th>Data</th>
          <th>Priority</th>
          <th>Repeat Inteval</th>
          <th>Next Run At</th>
          <th>Last Run At</th>
          <th>Last Finished At</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>{jobRows}</tbody>
    </Table>

  );
}

JobTable.propTypes = {
  jobs: React.PropTypes.array.isRequired,
  deleteJob: React.PropTypes.func.isRequired,
};

export default class Agenda extends React.Component {

  constructor(props, context){
    super(props, context);
    this.state = {
      jobs:  [],
      showing: false,
      toastVisible: false, toastMessage: '', toastType: 'success',
      host: '127.0.0.1',
      port: 5250,
      command: "",
      response: '',
      caspar_cls: '',
  };
  this.handleButtons = this.handleButtons.bind(this);
  this.handleNumberInput = this.handleNumberInput.bind(this);
  this.deleteJob = this.deleteJob.bind(this);
  this.showModal = this.showModal.bind(this);
  this.hideModal = this.hideModal.bind(this);
  this.submit = this.submit.bind(this);
  this.showError = this.showError.bind(this);
  this.dismissToast = this.dismissToast.bind(this);
}
showModal() {
    this.setState({ showing: true });
  }

  hideModal() {
    this.setState({ showing: false });
  }

  showError(message) {
    this.setState({ toastVisible: true, toastMessage: message, toastType: 'danger' });
  }

  dismissToast() {
    this.setState({ toastVisible: false });
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
submit(e) {
    e.preventDefault();
    this.hideModal();
    const form = document.forms.jobAdd;
    const newJob = {
      name: form.name.value, date: form.date.value
    };
    console.log(JSON.stringify(newJob));
    socket.emit('agenda-create-job', newJob);
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
deleteJob(id){
  console.log("deleting job with id: " + id);
  socket.emit("delete-job", id);
}
render() {
  return (
      <div><strong>Caspar Scheduler</strong>
         <Button onClick={this.showModal}><Glyphicon glyph="plus" />
      New Job
        <Modal keyboard show={this.state.showing} onHide={this.hideModal}>
          <Modal.Header closeButton>
            <Modal.Title>Create Job</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form name="jobAdd">
              <FormGroup>
                <ControlLabel>Name</ControlLabel>
                <FormControl name="name" autoFocus />
              </FormGroup>
              <FormGroup>
                 <ControlLabel>Date</ControlLabel>
                <FormControl name="date" />
              </FormGroup>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <ButtonToolbar>
              <Button type="button" bsStyle="primary" onClick={this.submit}>Submit</Button>
              <Button bsStyle="link" onClick={this.hideModal}>Cancel</Button>
            </ButtonToolbar>
          </Modal.Footer>
        </Modal>
      </Button>
        <JobTable jobs={this.state.jobs} deleteJob={this.deleteJob} />
        <div>{this.state.response}</div>
      </div>
    );
  }
  componentWillUnmount() {
    socket.off(this.props.page);
  }
  componentDidMount() {
    socket = SocketIOClient();
    socket.on('agenda-list', (jobs) => {
      console.log(JSON.stringify(jobs));
      this.setState({jobs: jobs});
    });
    socket.emit('agenda-list-jobs', {});
    socket.emit('control-interface-send-telnet', { host: this.state.host, port: this.state.port, command: 'cls'});
    socket.on('telnet-response', (mesg) => {
      this.setState({response: mesg});
    });
    socket.emit('caspar-connection-send-command');
    socket.on('caspar-connection-receive-command', (mesg) => {
      this.setState({response: mesg});
    });
  }
}

