import React from 'react';
import { Route, IndexRedirect, withRouter } from 'react-router';
import App from './App.jsx';
import IssueList from './IssueList.jsx';
import IssueEdit from './IssueEdit.jsx';
import DeviceList from './DeviceList.jsx';
import DeviceEdit from './DeviceEdit.jsx';
import ControllersSetup from './ControllersSetup.jsx';
import NewControllers from './NewControllers.jsx';
import DeviceMenu from './DeviceMenu.jsx';
import Diagnostics from './Diagnostics.jsx';
import Help from './Help.jsx';

const NoMatch = () => <p>Page Not Found</p>;

export default (
  <Route path="/" component={App} >
    <IndexRedirect to="/controllers" />
    <Route path="device_menu" component={DeviceMenu} />
    <Route path="randomizer" component={ControllersSetup} />
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
