import React, { Component } from "react";
import { Navbar, Nav } from "reactstrap";

class Header extends Component {
  render() {
    return (
        
      <div>
        <Navbar inverse>
          <Nav />
        </Navbar>
      </div>
    );
  }
}

export default Header;
