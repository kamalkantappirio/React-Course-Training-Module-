import React from 'react';

class App extends React.Component {
  componentDidMount() {
    const { routing } = this.props;
  }

  render() {
    const {children} = this.props;
    return (
      <div className="App">
        {children}
      </div>
    );
  }
}

function mapStateToProps(state) {
  const {routing} = state;
  return {
    routing
  };
}

export default App;
