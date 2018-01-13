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
import Group1 from './Group1.jsx';
import Group2 from './Group2.jsx';
import Diagnostics from './Diagnostics.jsx';
import Help from './Help.jsx';

const NoMatch = () => <p>Page Not Found</p>;

export default (
  <Route path="/" component={App} >
    <IndexRedirect to="/controllers" />
    <Route path="demo" component={Demo} />
    <Route path="group1" component={Group1} />
    <Route path="group2" component={Group2} />
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
