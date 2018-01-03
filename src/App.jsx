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
	<LinkContainer to="/control_interface">
        <NavItem>Control Interface</NavItem>
      </LinkContainer>
      <LinkContainer to="/randomizer">
        <NavItem>Randomizer</NavItem>
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
 <LinkContainer to="/diagnostics">
        <NavItem>Diagnostics</NavItem>
      </LinkContainer>
    </Nav>
    <Nav pullRight>
      <NavDropdown id="user-dropdown" title={<MdMoreVert size={18} />} noCaret>
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
