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
import Caspar1 from './CasparGroup1.jsx';
import Caspar2 from './CasparGroup2.jsx';
import Group1 from './Group1.jsx';
import Group2 from './Group2.jsx';
import PTZGroup1 from './PTZGroup1.jsx';
import PTZGroup2 from './PTZGroup2.jsx';
import ATEMGroup1 from './ATEMGroup1.jsx';
import ATEMGroup2 from './ATEMGroup2.jsx';
import Diagnostics from './Diagnostics.jsx';
import Help from './Help.jsx';

const NoMatch = () => <p>Page Not Found</p>;

export default (
  <Route path="/" component={App} >
    <IndexRedirect to="/controllers" />
    <Route path="caspar_group1" component={Caspar1} />
     <Route path="caspar_group2" component={Caspar2} />
    <Route path="demo" component={Demo} />
    <Route path="group1" component={Group1} />
    <Route path="group2" component={Group2} />
    <Route path="ptz_group1" component={PTZGroup1} />
    <Route path="ptz_group2" component={PTZGroup2} />
    <Route path="atem_group1" component={ATEMGroup1} />
    <Route path="atem_group2" component={ATEMGroup2} />
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
