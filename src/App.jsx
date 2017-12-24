import 'babel-polyfill';
import React from 'react';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, Glyphicon } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import IssueAddNavItem from './IssueAddNavItem.jsx';
import DeviceAddNavItem from './DeviceAddNavItem.jsx';

const Header = () => (
  <Navbar fluid>
    <Navbar.Header>
      <Navbar.Brand>Cinebrain</Navbar.Brand>
    </Navbar.Header>
    <Nav>
      <LinkContainer to="/controllers">
        <NavItem>Controllers</NavItem>
      </LinkContainer>
       <LinkContainer to="/new_controllers">
        <NavItem>New Controllers</NavItem>
      </LinkContainer>
      <LinkContainer to="/devices">
        <NavItem>Devices</NavItem>
      </LinkContainer>
 <LinkContainer to="/issues">
        <NavItem>Issues</NavItem>
      </LinkContainer>
    </Nav>
    <Nav pullRight>
      <IssueAddNavItem />
	<DeviceAddNavItem />
      <NavDropdown id="user-dropdown" title={<Glyphicon glyph="option-horizontal" />} noCaret>
		<LinkContainer to="/help">
			<MenuItem>Help</MenuItem>
      		</LinkContainer>
	</NavDropdown>
    </Nav>
  </Navbar>
);

const App = (props) => (
  <div>
    <Header />
    <div className="container-fluid">
      {props.children}
      <hr />
    </div>
  </div>
);

App.propTypes = {
  children: React.PropTypes.object.isRequired,
};

export default App;
