import React, { Component } from 'react';
import { getAccount } from '../../common/services/account';
import AccountRow from '../Common/AccountRow';
import { Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';

class Home extends Component {
  state = {
    loading: false,
    accountList: []
  };

  componentDidMount() {
    if (localStorage.getItem('token')) {
      this._handleLogin();
    } else {
      this.setState({ token: false });
    }
  }

  _handleLogin = () => {
    this.setState({ loading: true });
    const user = localStorage.getItem('username') ? localStorage.getItem('username') : this.__username.value;
    const pass = localStorage.getItem('password') ? localStorage.getItem('password') : this.__password.value + this.__token.value;
    getAccount(user, pass)
      .then(response => {
        let state = Object.assign({}, this.state);

        if (!localStorage.getItem('token')) {
          state.token = true;
          localStorage.setItem('token', response[0].accessToken);
          localStorage.setItem('username', this.__username.value);
          localStorage.setItem('password', this.__password.value + this.__token.value);
        } else {
          state.token = true;
        }

        state.loading = false;

        if (response !== 'undefined' && response !== null && response.records !== 'undefined') {
          response.shift();
          state.accountList = response;
          console.log(response);
        }

        this.setState(state);
      })
      .catch(error => {
        this.setState({ loading: false });
      });
  };

  render() {
    return (
      <div className="container">
        {this.state.token === false &&
          <div>
            <Form>
              <FormGroup row>
                <Label for="username" sm={2}>
                  Username
                </Label>
                <Col sm={10}>
                  <Input
                    type="email"
                    name="username"
                    id="username"
                    placeholder="username"
                    ref={input => {
                      this.__username = input;
                    }}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="password" sm={2}>
                  Password
                </Label>
                <Col sm={10}>
                  <Input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="password"
                    ref={input => {
                      this.__password = input;
                    }}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="token" sm={2}>
                  SFDC Security Token
                </Label>
                <Col sm={10}>
                  <Input
                    type="password"
                    name="token"
                    id="token"
                    placeholder="token"
                    ref={input => {
                      this.__token = input;
                    }}
                  />
                </Col>
              </FormGroup>
              <Button onClick={this._handleLogin}>Submit</Button>
            </Form>
          </div>}
        {!this.state.loading &&
          <div className="list-group">
            {this.state.accountList.map((account, index) => {
              return <AccountRow key={index} account={account} />;
            })}
          </div>}
      </div>
    );
  }
}

export default Home;
