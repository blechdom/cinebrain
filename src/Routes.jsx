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
import DMXGroup1 from './DMXGroup1.jsx';
import DMXGroup2 from './DMXGroup2.jsx';
import DMXGroup3 from './DMXGroup3.jsx';
import PTZGroup1 from './PTZGroup1.jsx';
import PTZGroup2 from './PTZGroup2.jsx';
import ATEMGroup1 from './ATEMGroup1.jsx';
import ATEMGroup2 from './ATEMGroup2.jsx';
import ATEMGroup3 from './ATEMGroup3.jsx';
import Diagnostics from './Diagnostics.jsx';
import Help from './Help.jsx';

const NoMatch = () => <p>Page Not Found</p>;

export default (
  <Route path="/" component={App} >
    <IndexRedirect to="/help" />
    <Route path="media_group1" component={MediaGroup1} />
    <Route path="media_group2" component={MediaGroup2} />
    <Route path="media_group3" component={MediaGroup3} />
    <Route path="demo" component={Demo} />
    <Route path="dmx_group1" component={DMXGroup1} />
    <Route path="dmx_group2" component={DMXGroup2} />
    <Route path="dmx_group3" component={DMXGroup3} />
    <Route path="ptz_group1" component={PTZGroup1} />
    <Route path="ptz_group2" component={PTZGroup2} />
    <Route path="atem_group1" component={ATEMGroup1} />
    <Route path="atem_group2" component={ATEMGroup2} />
    <Route path="atem_group3" component={ATEMGroup3} />
    <Route path="control_interface" component={ControlInterface} />
    <Route path="new_controllers" component={NewControllers} />
    <Route path="issues" component={withRouter(IssueList)} />
    <Route path="issues/:id" component={IssueEdit} />
    <Route path="devices" component={withRouter(DeviceList)} />
    <Route path="devices/:id" component={DeviceEdit} />
    <Route path="diagnostics" component={Diagnostics} />
    <Route path="help" component={withRouter(Help)} />
    <Route path="*" component={NoMatch} />  
</Route>
);
