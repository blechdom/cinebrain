import 'babel-polyfill';
import React from 'react';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, Glyphicon } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import MdMoreVert from 'react-icons/lib/md/more-vert';

const Header = () => (
  <Navbar fluid>
    <Navbar.Header>
      <Navbar.Brand>Cinebrain</Navbar.Brand>
    </Navbar.Header>
    <Nav>
    <LinkContainer to="/group1">
        <NavItem>Group 1</NavItem>
      </LinkContainer>
	<LinkContainer to="/group2">
        <NavItem>Group 2</NavItem>
      </LinkContainer>
    </Nav>
    <Nav pullRight>
      <NavDropdown id="user-dropdown" title={<MdMoreVert size={18} />} noCaret>
        <LinkContainer to="/demo">
        <MenuItem>Demo</MenuItem>
      </LinkContainer>
  <LinkContainer to="/control_interface">
        <MenuItem>Control Interface</MenuItem>
      </LinkContainer>
       <LinkContainer to="/new_controllers">
        <MenuItem>New Controllers</MenuItem>
      </LinkContainer>
      <LinkContainer to="/devices">
        <MenuItem>Devices</MenuItem>
      </LinkContainer>
 <LinkContainer to="/issues">
        <MenuItem>Issues</MenuItem>
      </LinkContainer>
 <LinkContainer to="/diagnostics">
        <MenuItem>Diagnostics</MenuItem>
      </LinkContainer>
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
