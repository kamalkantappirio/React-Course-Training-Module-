/* react/prop-types */
import React, { Component } from 'react';
import Header from '../Common/Header';


class App extends Component {
  state = {
    profile: {}
  }
  componentWillMount() {
    const { isAuthenticated } = this.props.route.auth;
    if (!isAuthenticated()) {
      this.login();
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
  route: React.PropTypes.route,
  children: React.PropTypes.children
};

export default App;
