import React, { Component } from 'react';
import loading from '../../common/assets/resources/loading.svg';
import Auth from '../../Auth/Auth';

class Callback extends Component {
    handleAuthentication = (nextState, replace) => {

        if(/access_token|id_token|error/.test(nextState.location.hash)) {
            new Auth().handleAuthentication();
        }
    }

    render() {

        const style = {
            position: 'absolute',
            display: 'flex',
            justifyContent: 'center',
            height: '100vh',
            width: '100vw',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: 'white',
        }

        this.handleAuthentication(this.props.auth);
        return (
            <div style={style}>
              <img src={loading} alt="loading"/>
            </div>
        );
    }
}

export default Callback;