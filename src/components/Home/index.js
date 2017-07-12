import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import AccountRow from '../Common/AccountRow';
import { getAccountList } from '../../common/services/restclient';

class Home extends Component {
  state = {
    loading: false,
    accountList: []
  };

  componentDidMount() {
    this._getAccountList();
  }

  _handleLogout = () => {
    localStorage.clear();
    browserHistory.replace('/');
  };

  _getAccountList = () => {
    getAccountList()
      .then(response => {
        const state = Object.assign({}, this.state);
        state.loading = false;
        if (response !== 'undefine' && response !== null && response.records !== 'undefine') state.accountList = response.records;

        this.setState(state);
      })
      .catch(error => {
        this.setState({ error, loading: false });
      });
  };

  render() {
    return (
      <div className="container">
        <button onClick={this._handleLogout}>Logout</button>

        {!this.state.loading &&
          <div className="list-group">
            {this.state.accountList.map(account => <AccountRow account={account} />)}
          </div>}
      </div>
    );
  }
}

export default Home;
