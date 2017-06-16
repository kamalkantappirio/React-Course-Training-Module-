// src/components/App/index.js
import React, { Component } from 'react';
import classnames from 'classnames';

import logo from './logo.svg';
import './style.css';

class App extends Component {

  static propTypes = {}
  static defaultProps = {}
  state = {
    "food" : []
  }

  search(query) {
    return fetch(`/api/?q=${query}`, {
      accept: 'application/json',
    }).then((response) => {
      return response.json();
    }).then((j) => {
      // Yay, `j` is a JavaScript object
      console.log(j); 
      this.setState({
        food: j[0].hello
      })
    });
  }

  componentDidMount() {
    this.search();

  }

  render() {
    
    const { className } = this.props;
    const { food } = this.state;
    return (
      <div className={classnames('App', className)}>
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React {food}</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
