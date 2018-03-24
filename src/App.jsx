import 'babel-polyfill';
import React from 'react';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, Glyphicon } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import MdMoreVert from 'react-icons/lib/md/more-vert';

const Header = () => (
  <Navbar fluid>
    <Navbar.Header>
      <Navbar.Brand><a href="/">KCAT: Cinebrain</a></Navbar.Brand>
    </Navbar.Header>
    <Nav>
      <NavDropdown id="user-dropdown" title="Tools">
        <LinkContainer to="/dmx_sliders">
          <NavItem>DMX sliders</NavItem>
        </LinkContainer>
        <LinkContainer to="/decklink">
          <NavItem>Video Recorders
          </NavItem>
        </LinkContainer>
	    </NavDropdown>
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
