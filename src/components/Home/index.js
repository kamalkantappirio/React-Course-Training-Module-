import React, { Component } from 'react';
import AccountRow from '../Common/AccountRow';
import { getAccountListWithMapping, getAccountMapping } from '../../common/services/restclient';


class Home extends Component {
  state = {
    loading: false,
    accountMapping: [],
    accountList: []
  };
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

  _getAccountList = () => {
    getAccountListWithMapping()
      .then((response) => {
        const state = Object.assign({}, this.state);
        state.loading = false;
        if (response !== 'undefined' && response !== null && response !== '') state.accountList = response;

        this.setState(state);
      })
      .catch((error) => {
        this.setState({ error, loading: false });
      });
  };


  render() {
    return (
      <div>
        {!this.state.loading && this.state.logout !== true &&
        <div className="list-group">
          {this.state.accountList.map(account => (<AccountRow index={account.Id} account={account} />))}
        </div>}
      </div>
    );
  }
}

export default Home;
