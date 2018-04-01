import React from 'react';
import { Route, IndexRedirect, withRouter } from 'react-router';
import App from './App.jsx';
import IssueList from './IssueList.jsx';
import IssueEdit from './IssueEdit.jsx';
import AgendaList from './AgendaList.jsx';
import AgendaEdit from './AgendaEdit.jsx';
import IssueAddNavItem from './IssueAddNavItem.jsx';
import DeviceList from './DeviceList.jsx';
import DeviceEdit from './DeviceEdit.jsx';
import NewControllers from './NewControllers.jsx';
import ControlInterface from './ControlInterface.jsx';
import Demo from './Demo.jsx';
import AudioGroup1 from './AudioGroup1.jsx';
import VideoGroup1 from './VideoGroup1.jsx';
import DMXSliders from './DMXSliders.jsx';
import DMXWashGroup1 from './DMXWashGroup1.jsx';
import DMX155Group2 from './DMX155Group2.jsx';
import DMX255Group2 from './DMX255Group2.jsx';
import PTZGroup1 from './PTZGroup1.jsx';
import Diagnostics from './Diagnostics.jsx';
import MidiLooper from './MidiLooper.jsx';
import Agenda from './Agenda.jsx';
import Decklink from './Decklink.jsx';
import KCATHome from './KCATHome.jsx';
import ATEM from './ATEMGroup1.jsx';
import Home from './Home.jsx';
import Help from './Help.jsx';
import RobotArm from './RobotArm.jsx';
import RobotHand from './RobotHand.jsx';

const NoMatch = () => <p>Page Not Found</p>;

export default (
  <Route path="/" component={App} >
    <IndexRedirect to="/home" />
    <Route path="robot_arm" component={RobotArm} />
    <Route path="robot_hand" component={RobotHand} />
    <Route path="decklink" component={Decklink} />
    <Route path="atem" component={ATEM} />
    <Route path="dmx_sliders" component={DMXSliders} />
    <Route path="kcat_home" component={KCATHome} />
    <Route path="audio_group1" component={AudioGroup1} />
    <Route path="video_group1" component={VideoGroup1} />
    <Route path="demo" component={Demo} />
    <Route path="agenda" component={Agenda} />
    <Route path="dmx_wash_group1" component={DMXWashGroup1} />
    <Route path="dmx_155_group2" component={DMX155Group2} />
    <Route path="dmx_255_group2" component={DMX255Group2} />
    <Route path="ptz_group1" component={PTZGroup1} />
    <Route path="midi_looper" component={MidiLooper} />
    <Route path="control_interface" component={ControlInterface} />
    <Route path="new_controllers" component={NewControllers} />
    <Route path="issues" component={withRouter(IssueList)} />
    <Route path="issues/:id" component={IssueEdit} />
    <Route path="agendas" component={withRouter(AgendaList)} />
    <Route path="agendas/:id" component={AgendaEdit} />
    <Route path="issue_add_item" component={IssueAddNavItem} />
    <Route path="devices" component={withRouter(DeviceList)} />
    <Route path="devices/:id" component={DeviceEdit} />
    <Route path="diagnostics" component={Diagnostics} />
    <Route path="help" component={withRouter(Help)} />
    <Route path="home" component={withRouter(Home)} />
    <Route path="*" component={NoMatch} />  
</Route>
);
