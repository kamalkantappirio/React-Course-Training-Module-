import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { getAccountMapping } from '../../common/services/restclient';

import { Table, Button } from 'reactstrap';

class Mapping extends Component {
  state = {
    loading: false,
    accountFields: [],
    fieldsArr: [
      {
        id: 1,
        name: 'Select Mapping'
      },
      {
        id: 2,
        name: 'BillingAddress'
      },
      {
        id: 3,
        name: 'mh_Goals__c'
      },
      {
        id: 4,
        name: 'Additional_Notes__c'
      },
      {
        id: 5,
        name: 'mh_our_strengths__c'
      },
      {
        id: 6,
        name: 'Target_Total__c'
      },
      {
        id: 7,
        name: 'Target_To_Date__c'
      },
      {
        id: 8,
        name: 'Target_From_Date__c'
      },
      {
        id: 9,
        name: 'Target_Existing__c'
      },
      {
        id: 10,
        name: 'Target_Estimate__c'
      }
    ],
    accountMapping: []
  };

  componentDidMount() {
    this._getAccountObject();
  }

  _handleLogout = () => {
    localStorage.clear();
    browserHistory.replace('/');
  };

  _getAccountObject = () => {
    getAccountMapping()
      .then(response => {
        // console.log(response);

        let state = Object.assign({}, this.state);
        state.loading = false;
        if (response !== 'undefine' && response !== null && response.records !== 'undefine') {
          console.log(response);
          this.setState({ accountMapping: response });
        }
      })
      .catch(error => {
        this.setState({ loading: false });
      });
  };

  /**
     * Method call when option change from drop-down
     * In this selected value save in json
     **/
  onDropDownChange = (selectedIndex, selectedValue) => {
    var accountMapping = this.state.accountMapping;
    var foundIndex = accountMapping.findIndex(x => x.id === selectedIndex);
    if (foundIndex >= 0) {
      if (selectedValue === 'Select Mapping') selectedValue = '';
      accountMapping[foundIndex].mapping = selectedValue;
    }

    this.setState({ accountMapping });
  };

  /**
     * Method call when user press submit button.
     **/
  onSubmitBtnClick = () => {
    console.log(this.state.accountMapping);
  };

  /**
     * Method use for render the row for data.
     **/
  renderRow = (rowData, index) => {
    console.log(rowData);
    return (
      <tr key={index}>
        <td>
          {rowData.id}
        </td>
        <td>
          {rowData.field}
        </td>
        <td>
          <select className="selectpicker" onChange={event => this.onDropDownChange(rowData.id, event.target.value)}>
            {this.state.fieldsArr.map((item, index) => {
              return this.renderDropDownOption(item, index);
            })}
          </select>
        </td>
      </tr>
    );
  };

  renderDropDownOption = (item, index) => {
    return (
      <option key={index}>
        {item.name}
      </option>
    );
  };

  render() {
    return (
      <div className="container">
        <button onClick={this._handleLogout}>Logout</button>

        {/*{!this.state.loading && <div className="list-group">
             {this.state.accountList.map((account, index) => {
             return <AccountRow key={index} account={account}/>;
             })
             }
             </div>}*/}

        {console.log('Mapping ' + this.state.accountMapping)}

        <div>
          <Table responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>Field</th>
                <th>Mapping</th>
              </tr>
            </thead>
            <tbody>
              {this.state.accountMapping.map((item, index) => {
                return this.renderRow(item, index);
              })}
            </tbody>
          </Table>

          <Button type="submit" onClick={this.onSubmitBtnClick}>
            Submit
          </Button>
        </div>
      </div>
    );
  }
}

export default Mapping;
