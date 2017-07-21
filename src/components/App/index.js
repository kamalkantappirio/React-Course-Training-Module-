/* eslint-disable react/prop-types */
import React, { Component, PropTypes } from 'react';
import Header from '../Common/Header';
import { API_CONST } from '../../common/constants';


class App extends Component {

  state = {
    isValid: false

  };
  componentDidMount() {
    const { location } = this.props;
    const token = location.query.access_token || localStorage.getItem('accessToken');
    const instanceUrl = location.query.instance_url || localStorage.getItem('instanceUrl');
    const userId = location.query.userid || localStorage.getItem('userId');


    if (token) {
      localStorage.setItem('accessToken', token);
      localStorage.setItem('instanceUrl', instanceUrl);
      localStorage.setItem('userId', userId);
    } else if (localStorage.getItem('logout') !== true) {
      window.location.href = `${API_CONST.LOGIN}`;
    }
  }

  render() {
    return (
      <div className="container">
        <Header logout />
        {this.props.children}
      </div>
    );
  }
}

App.propTypes = {
  location: PropTypes.shape({})
};

App.defaultProps = {
  location: ''
};

export default App;
