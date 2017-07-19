/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { Navbar, NavbarBrand, Nav, NavItem, Button } from 'reactstrap';

class Header extends Component {

  _handleLogout = () => {
    localStorage.clear();
    localStorage.setItem('logout', true);
    browserHistory.replace('/home');
    this.setState({ logout: true });
  };

  _handleLogin = () => {
    localStorage.setItem('logout', false);
    browserHistory.replace('/');
    this.setState({ logout: false });
  };
  _handleMapping = () => {
    browserHistory.replace('/mapping');
  };

  render() {
    const { logout } = this.props;
    return (<div>
      <Navbar color="faded" light toggleable>
        <NavbarBrand href="/">MHG</NavbarBrand>

        <Nav className="ml-auto" navbar>
          <NavItem>
            <Button color="primary" onClick={this._handleMapping}>Mapping</Button>
          </NavItem>
          <p >&nbsp;</p>
          <NavItem>
            {(logout === true)
                            ? <Button color="info" onClick={this._handleLogin}>User 2 Login</Button>
                            : <Button color="danger" onClick={this._handleLogout}>Logout</Button>
                        }
          </NavItem>
        </Nav>

      </Navbar>
    </div>);
  }
}

export default Header;
