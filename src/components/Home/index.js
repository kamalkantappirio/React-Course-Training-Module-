import React, {Component} from "react";
import {getAccountList,userLogin} from "../../common/services/restclient";
import AccountRow from "../Common/AccountRow";
import {browserHistory} from 'react-router'



class Home extends Component {

    state = {
        loading: false,
        accountList: []
    }

    componentDidMount() {
        console.log(JSON.stringify(this.props));


    }


    _handleLogout=()=>
    {
        localStorage.clear();
        browserHistory.replace('/');

    }

    _handleLogin = (username, password) => {
        this.setState({loading: true});

        userLogin(this.__username.value, this.__password.value).then(response => {
            console.log('page res');
            console.log(response);

            let state = Object.assign({}, this.state);
            state.loading = false;
            if(response !== 'undefine')
            {
                // Store
                localStorage.setItem("accessToken", response.accessToken);
                localStorage.setItem("instanceUrl", response.instanceUrl);



                this._getAccountList();
            }
            this.setState(state);
        }).catch(error => {
            this.setState({loading: false})
        });
    }

    _getAccountList=()=>{
        getAccountList().then(response => {
            console.log('page res');
            console.log(response);

            let state = Object.assign({}, this.state);
            state.loading = false;
            if(response !== 'undefine' && response !== null && response.records !== 'undefine')
                state.accountList = response.records;

            this.setState(state);
        }).catch(error => {
            this.setState({loading: false})
        });
    }

    render() {
        return (
            <div className="container">

                <input type="text" placeholder="username" ref={(input) => {
                    this.__username = input;
                }} />
                <input type="password" placeholder="password" ref={(input) => {
                    this.__password = input;
                }} />
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
