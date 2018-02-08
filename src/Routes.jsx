import React from 'react';
import { Route, IndexRedirect, withRouter } from 'react-router';
import App from './App.jsx';
import IssueList from './IssueList.jsx';
import IssueEdit from './IssueEdit.jsx';
import DeviceList from './DeviceList.jsx';
import DeviceEdit from './DeviceEdit.jsx';
import NewControllers from './NewControllers.jsx';
import ControlInterface from './ControlInterface.jsx';
import Demo from './Demo.jsx';
import MediaGroup1 from './MediaGroup1.jsx';
import MediaGroup2 from './MediaGroup2.jsx';
import MediaGroup3 from './MediaGroup3.jsx';
import DMXSpotGroup1 from './DMXSpotGroup1.jsx';
import DMXWashGroup1 from './DMXWashGroup1.jsx';
import DMX155Group2 from './DMX155Group2.jsx';
import DMX255Group2 from './DMX255Group2.jsx';
import PTZGroup1 from './PTZGroup1.jsx';
import PTZGroup2 from './PTZGroup2.jsx';
import ATEMGroup1 from './ATEMGroup1.jsx';
import ATEMGroup2 from './ATEMGroup2.jsx';
import ATEMGroup3 from './ATEMGroup3.jsx';
import Diagnostics from './Diagnostics.jsx';
import MidiLooper from './MidiLooper.jsx';
import Home from './Home.jsx';
import Help from './Help.jsx';

const NoMatch = () => <p>Page Not Found</p>;

export default (
  <Route path="/" component={App} >
    <IndexRedirect to="/home" />
    <Route path="media_group1" component={MediaGroup1} />
    <Route path="media_group2" component={MediaGroup2} />
    <Route path="media_group3" component={MediaGroup3} />
    <Route path="demo" component={Demo} />
    <Route path="dmx_spot_group1" component={DMXSpotGroup1} />
    <Route path="dmx_wash_group1" component={DMXWashGroup1} />
    <Route path="dmx_155_group2" component={DMX155Group2} />
    <Route path="dmx_255_group2" component={DMX255Group2} />
    <Route path="ptz_group1" component={PTZGroup1} />
    <Route path="ptz_group2" component={PTZGroup2} />
    <Route path="atem_group1" component={ATEMGroup1} />
    <Route path="atem_group2" component={ATEMGroup2} />
    <Route path="atem_group3" component={ATEMGroup3} />
    <Route path="midi_looper" component={MidiLooper} />
    <Route path="control_interface" component={ControlInterface} />
    <Route path="new_controllers" component={NewControllers} />
    <Route path="issues" component={withRouter(IssueList)} />
    <Route path="issues/:id" component={IssueEdit} />
    <Route path="devices" component={withRouter(DeviceList)} />
    <Route path="devices/:id" component={DeviceEdit} />
    <Route path="diagnostics" component={Diagnostics} />
    <Route path="help" component={withRouter(Help)} />
    <Route path="home" component={withRouter(Home)} />
    <Route path="*" component={NoMatch} />  
</Route>
);
