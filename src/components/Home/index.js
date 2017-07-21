import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import AccountRow from '../Common/AccountRow';
import { getAccountListWithMapping, getAccountMapping } from '../../common/services/restclient';


class Home extends Component {
  state = {
    loading: false,
    accountMapping: [],
    accountList: []
  };

  componentWillMount() {
    const loggedIn = localStorage.getItem('logout');

    if (loggedIn === true) {
      this.setState({ logout: true });
    } else {
      this.setState({ logout: false });
    }
  }

  componentDidMount() {
    this._getAccountMapping();
    this._getAccountList();
  }

  _getAccountMapping = () => {
    getAccountMapping()
      .then((response) => {
        const state = Object.assign({}, this.state);
        state.loading = false;
        if (response !== 'undefined' && response !== null && response.records !== 'undefined') {
          this.setState({ accountMapping: response });
        }
      })
      .catch((error) => {
        this.setState({ error, loading: false });
      });
  };

  _handleLogin = () => {
    localStorage.setItem('logout', false);
    this.setState({ logout: false });
    browserHistory.replace('/');
  };

  _handleLogout = () => {
    localStorage.setItem('logout', true);
    this.setState({ logout: true });
    window.location.href = '/logout';
  };

  _handleMapping = () => {
    browserHistory.replace('/mapping');
  };
  _getAccountList = () => {
    getAccountListWithMapping()
      .then((response) => {
        const state = Object.assign({}, this.state);
        state.loading = false;
        if (response !== 'undefined' && response !== null) state.accountList = response;

        this.setState(state);
      })
      .catch((error) => {
        this.setState({ error, loading: false });
      });
  };


  render() {
    return (
      <div className="container">
        <div className="list-group">
          {this.state.accountList.map(account => (<AccountRow key={account.Id} account={account} />))}
        </div>
      </div>
    );
  }
}

export default Home;
