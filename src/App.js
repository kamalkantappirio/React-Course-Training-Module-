import React from 'react';
import Header from './components/Header';
import Loading from './components/Loading';
import {connect} from 'react-redux';
import {queryParams} from './common/services/url';
import {setUserFromToken} from './common/actions/user';
import { ENVIRONMENT, LOCAL_STORAGE } from './common/constants';
import ErrorComponent from './components/ErrorComponent';

class App extends React.Component {
  loading = true;

  componentDidMount() {
    const { routing, dispatch } = this.props;
    // If it's in queryParams, it's a callback from our Auth API
    let params = queryParams(routing.location.search);
    let token = params.token || localStorage[LOCAL_STORAGE.TOKEN];
    if (token) {
      dispatch(setUserFromToken(token));
    } else {
      window.location.href = `${ENVIRONMENT.AUTH_API_ROOT}/auth/login`;
    }
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   // TODO: See why dispatch.pushes aren't updating when location changes
  //   return true;
  // }

  componentWillReceiveProps(nextProps) {
    const { user } = this.props;
    if(nextProps.user.error){
      this.loading = false;
    }else if (!user.userRole && nextProps.user.userRole) {
      this.loading = false;
    } else if((user.userRole && !nextProps.user.userRole)) {
      // Logged out
      window.location.href = `${ENVIRONMENT.AUTH_API_ROOT}/auth/login`;
    }
  }

  render() {
    const {children, user} = this.props;
    let errorLink = null;
    if (user.error) {
      errorLink = <a onClick={() => {
        delete localStorage[LOCAL_STORAGE.TOKEN];
        window.location.href = `${ENVIRONMENT.AUTH_API_ROOT}/auth/login`;
      }} href="#">Click here to login again</a>;
    }
    return (
      <div className="App">
        <Header />
        {!this.loading && !user.error && children}
        {this.loading && <Loading />}
        {user.error &&  <ErrorComponent
          errorMessage={`You do not have access to Store Walk. Please contact your administrator and try again.`}
          errorLink={errorLink} />}
      </div>
    );
  }
}

function mapStateToProps(state) {
  const {user, routing} = state;
  return {
    user,
    routing
  };
}

export default connect(mapStateToProps)(App);
