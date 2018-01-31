import 'babel-polyfill';
import React from 'react';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, Glyphicon } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import MdMoreVert from 'react-icons/lib/md/more-vert';

const Header = () => (
  <Navbar fluid>
    <Navbar.Header>
      <Navbar.Brand><a href="/">Cinebrain</a></Navbar.Brand>
    </Navbar.Header>
    <Nav>
      <NavDropdown id="user-dropdown" title="Group 1">
        <LinkContainer to="/dmx_group1">
          <NavItem>Lights</NavItem>
        </LinkContainer>
        <LinkContainer to="/ptz_group1">
          <NavItem>Camera</NavItem>
        </LinkContainer>
        <LinkContainer to="/media_group1">
          <MenuItem>Media</MenuItem>
        </LinkContainer>
         <LinkContainer to="/atem_group1">
          <MenuItem>Video Switch</MenuItem>
        </LinkContainer>
	    </NavDropdown>
      <NavDropdown id="user-dropdown" title="Group 2">
       <LinkContainer to="/dmx_group2">
        <NavItem>Lights</NavItem>
      </LinkContainer>
       <LinkContainer to="/ptz_group2">
        <NavItem>Camera</NavItem>
      </LinkContainer>
       <LinkContainer to="/media_group2">
        <MenuItem>Media</MenuItem>
      </LinkContainer>
       <LinkContainer to="/atem_group2">
          <MenuItem>Video Switch</MenuItem>
        </LinkContainer>
      </NavDropdown>
      <NavDropdown id="user-dropdown" title="Group 3">
        <LinkContainer to="/dmx_group3">
          <NavItem>Lights</NavItem>
        </LinkContainer>
        <LinkContainer to="/media_group3">
          <MenuItem>Media</MenuItem>
        </LinkContainer>
         <LinkContainer to="/atem_group3">
          <MenuItem>Video Switch</MenuItem>
        </LinkContainer>
      </NavDropdown>
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
