import React, {Component} from 'react';
import {API_CONST,ENVIRONMENT} from '../../common/constants';
import {browserHistory} from 'react-router'

class App extends Component {

  static propTypes = {}
  static defaultProps = {}
  state = {
  }


    componentDidMount() {
        const { location } = this.props;
        console.log(JSON.stringify(this.props));

        // If it's in queryParams, it's a callback from our Auth API
        //let params = queryParams(routing.locationBeforeTransitions.search);
        let token = location.query.access_token || localStorage.getItem('accessToken');
        if (token) {
            localStorage.setItem("accessToken", token);
            console.log(localStorage.getItem('accessToken'));
            browserHistory.replace('/home')

        } else {
            window.location.href =  `${ENVIRONMENT.API_ROOT}${API_CONST.LOGIN}`;
        }
    }

    render() {
        return (

            <div className="container">
              {/* <Header auth={this.props.route.auth} />*/}
            </div>
        );
    }


     _handleLogin = () => {

     }

}

function mapStateToProps(state) {
    const { routing } = state;
    return {

        routing
    };
}

export default App;


