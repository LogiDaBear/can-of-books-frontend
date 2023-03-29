import React from 'react';
import { Navbar, NavItem, Button } from 'react-bootstrap';
import { Link } from "react-router-dom";
// import './Header.css'



class Header extends React.Component {
  render() {
    return (
      <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
        <Navbar.Brand>My Favorite Books</Navbar.Brand>

        <NavItem><Link to="/about" className="nav-link"><Button>About</Button></Link></NavItem>

        <NavItem><Link to="/" className="nav-link"><Button>Home</Button></Link></NavItem>

      </Navbar>
                
    )
  }
}

export default Header;
