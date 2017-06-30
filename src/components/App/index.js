import React, {Component} from 'react';
import Header from "../Common/Header";

class App extends Component {

  static propTypes = {}
  static defaultProps = {}
  state = {
  }

    goTo(route) {
        this.props.history.replace(`/${route}`)
    }

    render() {
        return (
            <div className="container">
               <Header auth={this.props.route.auth} />
            </div>
        );
    }
}

export default App;
