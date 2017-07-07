import React, { Component } from "react";

class App extends Component {
  static propTypes = {};
  static defaultProps = {};
  state = {};

  goTo(route) {
    this.props.history.replace(`/${route}`);
  }

  render() {
    return <div className="container" />;
  }
}

export default App;
