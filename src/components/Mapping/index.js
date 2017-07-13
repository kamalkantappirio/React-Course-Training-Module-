import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { Table, Button } from 'reactstrap';
import { getAccountMapping } from '../../common/services/restclient';

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

  /**
     * Method call when option change from drop-down
     * In this selected value save in json
     **/
  onDropDownChange = (selectedIndex, selectedValue) => {
    const accountMapping = this.state.accountMapping;
    const foundIndex = accountMapping.findIndex(x => x.id === selectedIndex);
    let selVal = selectedValue;
    if (foundIndex >= 0) {
      if (selVal === 'Select Mapping') {
        selVal = '';
      }
      accountMapping[foundIndex].mapping = selVal;
    }

    this.setState({ accountMapping });
  };

  /**
     * Method call when user press submit button.
     **/
  onSubmitBtnClick = () => {
    console.log(this.state.accountMapping); // eslint-disable-line
  };

  _getAccountObject = () => {
    getAccountMapping()
      .then((response) => {
        // console.log(response);

        const state = Object.assign({}, this.state);
        state.loading = false;
        if (response !== 'undefine' && response !== null && response.records !== 'undefine') {
          this.setState({ accountMapping: response });
        }
      })
      .catch((error) => {
        this.setState({ error, loading: false });
      });
  };

  _handleLogout = () => {
    localStorage.clear();
    browserHistory.replace('/');
  };

  /**
     * Method use for render the row for data.
     **/
  _renderRow = (rowData, index) =>
    (<tr key={index}>
      <td>
        {rowData.id}
      </td>
      <td>
        {rowData.field}
      </td>
      <td>
        <select className="selectpicker" onChange={event => this.onDropDownChange(rowData.id, event.target.value)}>
          {this.state.fieldsArr.map((item, indexVal) => this.renderDropDownOption(item, indexVal))}
        </select>
      </td>
    </tr>);

  _renderDropDownOption = (item, index) =>
    (<option key={index}>
      {item.name}
    </option>);

  render() {
    return (
      <div className="container">
        <button onClick={this._handleLogout}>Logout</button>

        {console.log(`Mapping ${this.state.accountMapping}`) // eslint-disable-line
        }

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
              {this.state.accountMapping.map((item, index) => this._renderRow(item, index))}
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
