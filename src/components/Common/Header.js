/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { Navbar, NavbarBrand, Nav, NavItem, Button } from 'reactstrap';
import { API_CONST } from '../../common/constants';

import { Logout } from '../../common/services/restclient';

class Header extends Component {


  componentWillMount() {
    const loggedIn = localStorage.getItem('logout');

    if (loggedIn) {
      this.setState({ logout: false });
    } else {
      this.setState({ logout: true });
    }
  }

  _handleLogout = () => {
    localStorage.clear();
    localStorage.setItem('logout', true);

    this.setState({ logout: true });

    Logout()
      .then((response) => {
        console.log(response);
        const state = Object.assign({}, this.state);
        state.loading = false;
        if (response !== 'undefined' && response !== null) state.accountList = response;

        this.setState(state);
      })
      .catch((error) => {
        this.setState({ error, loading: false });
      });
  };

  _handleLogin = () => {
    localStorage.setItem('logout', false);
    window.location.href = `${API_CONST.LOGIN}`;
    this.setState({ logout: false });
  };
  _handleMapping = () => {
    browserHistory.replace('/mapping');
  };


  render() {
    return (<div>
      <Navbar color="faded" light toggleable>
        <NavbarBrand href="/">MHG</NavbarBrand>

        <Nav className="ml-auto" navbar>
          <NavItem>
            <Button color="primary" onClick={this._handleMapping}>Mapping</Button>
          </NavItem>
          <p >&nbsp;</p>
          <NavItem>
            {(this.state.logout === true)
                            ? <Button color="info" onClick={this._handleLogin}>Login</Button>
                            : <Button color="danger" onClick={this._handleLogout}>Logout</Button>
                        }
          </NavItem>
        </Nav>

      </Navbar>
    </div>);
  }
}

export default Header;
