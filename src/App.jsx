import 'babel-polyfill';
import React from 'react';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, Glyphicon } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import MdMoreVert from 'react-icons/lib/md/more-vert';

const Header = () => (
  <Navbar fluid>
    <Navbar.Header>
      <Navbar.Brand><a href="/">Tony: Cinebrain</a></Navbar.Brand>
    </Navbar.Header>
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
