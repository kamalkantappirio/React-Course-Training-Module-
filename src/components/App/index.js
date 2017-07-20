/* eslint-disable react/prop-types */
import React, { Component, PropTypes } from 'react';
import Header from '../Common/Header';
import { API_CONST } from '../../common/constants';


class App extends Component {
  state = {
    logout: false
  };

  componentDidMount() {
    const { location } = this.props;
    const token = location.query.access_token || localStorage.getItem('accessToken');
    const instanceUrl = location.query.instance_url || localStorage.getItem('instanceUrl');
    if (token) {
      localStorage.setItem('accessToken', token);
      localStorage.setItem('instanceUrl', instanceUrl);
    } else if (localStorage.getItem('logout') !== true) {
      window.location.href = `${API_CONST.LOGIN}`;
    }
  }

  render() {
    return (
      <div className="container">
        <Header logout={this.state.logout} />
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
