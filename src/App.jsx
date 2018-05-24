import 'babel-polyfill';
import React from 'react';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, Glyphicon } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import MdMoreVert from 'react-icons/lib/md/more-vert';

const Header = () => (
  <Navbar fluid>
    <Navbar.Header>
      <Navbar.Brand><a href="/">Cinebrain: The New Gaze</a></Navbar.Brand>
    </Navbar.Header>
    <Nav>
      <LinkContainer to="/master_cues">
        <NavItem>Master Cues</NavItem>
      </LinkContainer>
      <LinkContainer to="/dmx_155_group1">
        <NavItem>Spot 1</NavItem>
      </LinkContainer>
      <LinkContainer to="/dmx_155_group2">
        <NavItem>Spot 2</NavItem>
      </LinkContainer>
        <LinkContainer to="/dmx_midi">
        <NavItem>DMX MIDI Control</NavItem>
      </LinkContainer>
      <LinkContainer to="/ptz_group1">
        <NavItem>PTZ Camera</NavItem>
      </LinkContainer>
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
