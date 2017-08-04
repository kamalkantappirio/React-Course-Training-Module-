/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { Link } from 'react-router';

export class Sidebar extends Component {


  menus = {
    '/courses': {
      className: 'fa fa-fw fa-dashboard',
      title: 'Courses',
    },
    '/enrollCourses': {
      className: 'fa fa-fw fa-table',
      title: 'My Training',
    },
    '/notes': {
      className: 'fa fa-fw fa-edit',
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
      <div className="collapse navbar-collapse navbar-ex1-collapse">
        <ul className="nav navbar-nav side-nav">
          { Object.keys(this.menus).map(menuKey => this.renderMenuItem(menuKey, this.menus[menuKey]))
              }
          <li>
            <Link onClick={() => this.logout(this)}><i className="fa fa-fw fa-wrench" /> Logout</Link>
          </li>

        </ul>
      </div>);
  }
}

export default Sidebar;
