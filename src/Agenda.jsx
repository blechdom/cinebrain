import React from 'react';
import ReactDOM from 'react-dom';
import 'isomorphic-fetch';
import { Link } from 'react-router';
import {NavItem, Row, Col, Button, Glyphicon, Table, Panel, Modal, Form, FormGroup, ButtonToolbar, FormControl, ControlLabel, Input} from 'react-bootstrap';
import { SocketProvider } from 'socket.io-react';
import SocketIOClient from 'socket.io-client';
import FaTrash from 'react-icons/lib/fa/trash';
import DateTimeField from "react-bootstrap-datetimepicker";
//import Moment from 'moment';

let socket;

const JobRow = (props) => {
  function onDeleteClick() {
    props.deleteJob(props.job._id);
  }

  //console.log(props.job.data.clip.duration);
  //console.log((new Date(Number(props.job.data.clip.duration) * 1000)).toUTCString().match(/(\d\d:\d\d:\d\d)/)[0]);

  return (
    <tr>
      <td>{props.job.name}</td>
      <td>{props.job.type}</td>
      <td>{props.job.data.clip.name}</td>
      <td>{(new Date(Number(props.job.data.clip.duration) * 1000)).toUTCString().match(/(\d\d:\d\d:\d\d)/)[0]}</td>
      <td>{props.job.priority}</td>
      <td>{props.job.repeatInterval}</td>
      <td>{(new Date(props.job.nextRunAt)).toString()}</td>
      <td>{(new Date(props.job.lastRunAt)).toString()}</td>
      <td>{(new Date(props.job.lastFinishedAt)).toString()}</td>
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
          <th>Clip</th>
          <th>Duration</th>
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
      clips: [],
      clipsList: <option>empty set</option>,
      datetime: '',
      repeat_interval: '',
      priority: '',
  };
  this.handleButtons = this.handleButtons.bind(this);
  this.handleNumberInput = this.handleNumberInput.bind(this);
  this.deleteJob = this.deleteJob.bind(this);
  this.showModal = this.showModal.bind(this);
  this.hideModal = this.hideModal.bind(this);
  this.submit = this.submit.bind(this);
  this.showError = this.showError.bind(this);
  this.dismissToast = this.dismissToast.bind(this);
  this.createCasparSelectClips = this.createCasparSelectClips.bind(this);
  this.storeDate = this.storeDate.bind(this);
  this.prioritySelected = this.prioritySelected.bind(this);
  this.repeatSelected = this.repeatSelected.bind(this);
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
    let clip_number = form.caspar_select.value;
    let clip_info = this.state.clips[clip_number];
    const newJob = {
      name: form.name.value, date: this.state.datetime, clip: clip_info
    };
    console.log("new job: " + JSON.stringify(newJob));
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
storeDate(newDate){
    console.log("save date and time: ", newDate);
    this.setState({datetime: newDate});
  }
prioritySelected(priority){
    console.log("priority: ", priority);
    this.setState({priority: priority});
  }
repeatSelected(repeat){
    console.log("repeat interval: ", repeat);
    this.setState({repeat_interval: repeat});
  }
deleteJob(id){
  console.log("deleting job with id: " + id);
  socket.emit("delete-job", id);
}
createCasparSelectClips() {
     let clipsList = [];    
     let clips = this.state.clips;  
     if(clips.length>0)   {
     for (let i = 0; i < clips.length; i++) {             
          let clip = clips[i];
          clipsList.push(<option key={i} value={i}>{clip.name}</option>);
     }
   }
 
    this.setState({clipsList: clipsList});
 }  

render() {
  return (
      <div><strong>Caspar Scheduler</strong>
         <div><Button onClick={this.showModal}><Glyphicon glyph="plus" />
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
                 <ControlLabel>Date & Time</ControlLabel>
                <DateTimeField 
                  onChange={this.storeDate}
                />
              </FormGroup>
               <FormGroup>
              <ControlLabel>Repeat Every</ControlLabel>
                <FormControl name="repeat_every" 
                  componentClass="select"
                  onChange={this.repeatSelected}>
                   <option value="no_repeat">no repeat</option>
                  <option value="hour">hour</option>
                  <option value="day">day</option>
                  <option value="week">week</option>
                  <option value="month">month</option>
                </FormControl>
                 </FormGroup>
                  <FormGroup>
                 <ControlLabel>Scheduling Priority</ControlLabel>
                <FormControl name="priority" 
                  componentClass="select"
                  defaultValue="0"
                  onChange={this.prioritySelected}>
                  <option value="-20">lowest</option>
                  <option value="-10">low</option>
                  <option value="0">normal</option>
                  <option value="10">high</option>
                  <option value="20">highest</option>
                </FormControl>
                 </FormGroup>
                  <FormGroup>
                 <ControlLabel>Select CasparCG Clip</ControlLabel>
                <FormControl name="caspar_select" 
                  componentClass="select" placeholder="select" onChange={this.onCasparClipSelected}>
                  <option value="">select</option>
                  {this.state.clipsList}
                </FormControl>
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
      </Button></div>
      <div>
        <JobTable jobs={this.state.jobs} deleteJob={this.deleteJob} />
      </div>
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
    //socket.emit('control-interface-send-telnet', { host: this.state.host, port: this.state.port, command: 'cls'});
    socket.emit('get-casparconnection-cls', {});
    socket.on('receive-casparconnection-cls', (mesg) => {
        this.setState({clips: mesg.response.data});
        console.log(this.state.clips);
        this.createCasparSelectClips();
    });

    //socket.on('telnet-response', (mesg) => {
      //this.setState({response: mesg});
    //});
    //socket.emit('caspar-connection-send-command');
    //socket.on('caspar-connection-receive-command', (mesg) => {
     // this.setState({response: mesg});
    //});

    /* <div><Input type="select" onChange={this.onCasparClipSelected} label="Multiple Select" multiple>
       {this.createCasparSelectClips()}
  </Input></div>
<div>{JSON.stringify(this.state.clips)}</div>
  */
  }
}

