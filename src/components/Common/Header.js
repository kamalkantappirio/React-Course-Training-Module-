/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';

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
            console.log(profile);
            this.setState({ profile });
          }
        });
      } else {
        this.setState({ profile: userProfile });
      }
    }
  }

  menus = {
    '/courses': {
      className: 'fa fa-fw fa-dashboard',
      title: 'Courses',
    },
    '/': {
      className: 'fa fa-fw fa-edit',
      title: 'My Training',
    },
    '/notes': {
      className: 'fa fa-fw fa-table',
      title: 'Notes'
    },
    '/completedCourses': {
      className: 'fa fa-fw fa-bar-chart-o',
      title: 'Completed Courses'
    },
    '/videos': {
      className: 'fa fa-fw fa-desktop',
      title: 'Videos'
    }
  };

  _goingToHome = () => {
    browserHistory.replace('/');
  };

  logout() {
    const userData = this.props.user;
    userData.logout();
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
      <Link className="navbar navbar-inverse navbar-fixed-top" role="navigation">
        <div className="navbar-header">
          <a className="navbar-brand" href="index.html">Appirio Learning</a>
        </div>

        <ul className="nav navbar-right top-nav">

          <li className="dropdown">
            <a className="dropdown-toggle" data-toggle="dropdown"><i className="fa fa-user" /> {(this.state.profile !== null && this.state.profile.name !== null) ? this.state.profile.name : ''} </a>
          </li>
        </ul>

        {/* <!-- Sidebar Menu Items - These collapse to the responsive navigation menu on small screens -->*/}
        <div className="collapse navbar-collapse navbar-ex1-collapse">
          <ul className="nav navbar-nav side-nav">
            { Object.keys(this.menus).map(menuKey => this.renderMenuItem(menuKey, this.menus[menuKey]))
            }
            <li>
              <Link onClick={() => this.logout(this)}><i className="fa fa-fw fa-wrench" /> Logout</Link>
            </li>

          </ul>
        </div>

      </Link>);
  }
}

export default Header;
