import React, {Component} from 'react';
import { API_CONST, ENVIRONMENT } from '../../common/constants';
import {browserHistory} from 'react-router'

class App extends Component {

  state = {}

    componentDidMount() {
        const { location } = this.props;
        let token = location.query.access_token || localStorage.getItem('accessToken');
        let instanceUrl=location.query.instance_url || localStorage.getItem('instanceUrl');

        if (token) {
            localStorage.setItem("accessToken", token);
            localStorage.setItem("instanceUrl", instanceUrl);
            console.log(localStorage.getItem('instanceUrl'));
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




}

export default App;


