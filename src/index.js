import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Test from './components/Test';

// Redux and react-router
import {Route, Router} from 'react-router'; // TODO: Disable when we have Auth working
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
    <BrowserRouter history={history}>
      <App>
        <Route exact={true} path="/" component={Test}/>
      </App>
    </BrowserRouter>,
  document.getElementById('root')
);
