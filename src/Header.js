import React from 'react';
import { Navbar, NavItem } from 'react-bootstrap';
import { Link } from "react-router-dom";


class Header extends React.Component {
  render() {
    return (
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="light">
        <Navbar.Brand>My Favorite Books</Navbar.Brand>
        <NavItem><Link to="/about" className="nav-link">About</Link></NavItem>

        <NavItem><Link to="/" className="nav-link">Home</Link></NavItem>

      </Navbar>
        
        
  
        
    )
  }
}

export default Header;
