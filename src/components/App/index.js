import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';
import { API_CONST } from '../../common/constants';


class App extends Component {
  componentDidMount() {
    const { location } = this.props;
    const token = location.query.access_token || localStorage.getItem('accessToken');
    const instanceUrl = location.query.instance_url || localStorage.getItem('instanceUrl');
    const userId = location.query.user_id || localStorage.getItem('userId');
    if (token) {
      localStorage.setItem('userId', userId);
      localStorage.setItem('accessToken', token);
      localStorage.setItem('instanceUrl', instanceUrl);
      browserHistory.replace('/home');
    } else if (localStorage.getItem('logout') !== true) {
      window.location.href = `${window.location.protocol}//${document.domain}:3001${API_CONST.LOGIN}`;
    }
  }

  render() {
    return (
      <div className="container">
        {/* <Header auth={this.props.route.auth} />*/}
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
