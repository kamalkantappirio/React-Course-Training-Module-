/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';
import { Sidebar } from './Sidebar';

class Header extends Component {
  state = {
    profile: {},
  }

  componentWillMount() {
    const { userProfile, getProfile, isAuthenticated } = this.props.user;
    console.log(this.props);
    if (isAuthenticated()) {
      if (!userProfile) {
        getProfile((err, profile) => {
          if (profile !== null) {
            this.setState({ profile });
          }
        });
      } else {
        this.setState({ profile: userProfile });
      }
    }
  }

  _goingToHome = () => {
    browserHistory.replace('/courses');
  };

  logout() {
    const userData = this.props.user;
    userData.logout();
  }

  login() {
    const userData = this.props.user;
    userData.login();
  }

  renderMenuItem = (route, menu) => {
    const isActive = false;
    return (
      <li key={route} className={isActive ? 'active' : ''}>
        <Link to={route}>
          <span className={menu.className} />
          <span>{menu.title}</span>
        </Link>
      </li>
    );
  };

  render() {
    return (
      <div>
        <Link className="navbar navbar-inverse navbar-fixed-top" role="navigation">
          <div className="navbar-header">
            <Link className="navbar-brand" href="index.html">Appirio Learning</Link>
          </div>
          <header className="header hidden-xs">
            <form action="">
              <input type="search" name="s" placeholder="Search on learning" />
            </form>
            <ul className="nav navbar-right top-nav">
              <li className="dropdown">
                <Link className="dropdown-toggle" data-toggle="dropdown" onClick={() => this.login(this)}><i className="fa fa-user" /> {this.props.user.isAuthenticated() ? this.state.profile.name : 'Login'}
                </Link>
              </li>
            </ul>
            <div className="clr" />
          </header>
          {this.props.user.isAuthenticated() && <Sidebar user={this.props.user} />}
        </Link>

      </div>);
  }
}

export default Header;
