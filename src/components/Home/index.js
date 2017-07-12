import React, {Component} from "react";
import {getAccount} from "../../common/services/account";
import AccountRow from "../Common/AccountRow";
import {browserHistory} from 'react-router'
import {getAccountList} from '../../common/services/restclient'



class Home extends Component {

    state = {
        loading: false,
        accountList: []
    }

    componentDidMount() {
        console.log(JSON.stringify(this.props));
     this._getAccountList();

    }


    _handleLogout=()=>
    {
        localStorage.clear();
        browserHistory.replace('/');

    }


    _getAccountList=()=>{
        getAccountList().then(response => {

            console.log(response);

            let state = Object.assign({}, this.state);
            state.loading = false;
            if(response !== 'undefine' && response !== null && response.records !== 'undefine')
                state.accountList = response.records;

            this.setState(state);
        }).catch(error => {
            this.setState({loading: false})
        });
       /* getAccount(this.__username.value, this.__password.value).then(response => {

            let state = Object.assign({}, this.state);

            if(response[0].accessToken) {
                state.token = true;
            }

            state.loading = false;
            
            if(response !== 'undefined' && response !== null && response.records !== 'undefined') {
                delete response[0];
                state.accountList = response;
                console.log(response);
            }

            this.setState(state);
        })
        
        .catch(error => {
            this.setState({loading: false})
        });*/
    }

    render() {
        return (
            <div className="container">


                <button onClick={this._handleLogout}>Logout</button>

                {!this.state.loading && <div className="list-group">
                    {this.state.accountList.map((account, index) => {
                        return <AccountRow key={index} account={account}/>;
                    })
                    }
                </div>}

            </div>
        );
    }
}

export default Home;
