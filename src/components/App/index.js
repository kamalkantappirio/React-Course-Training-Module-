/* react/prop-types */
import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';
import Header from '../Common/Header';


class App extends Component {
  state = {
    profile: {}
  }

  componentDidMount() {
    const { isAuthenticated } = this.props.route.auth;
    if (!isAuthenticated()) {
      browserHistory.push({ pathname: '/' });
    } else {
      browserHistory.push({ pathname: '/courses' });
    }
  }

  login() {
    this.props.route.auth.login();
  }

  render() {
    return (
      <div id="wrapper">
        <Header user={this.props.route.auth} />
        {this.props.children}
      </div>
    );
  }
}

App.propTypes = {
  route: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  children: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

export default App;
