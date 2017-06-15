import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Home from './routes/Home';
import Store from './routes/Store';
import Survey from './routes/Survey';
import Modal from './components/Modals';
import SurveyDone from './components/SurveyDone';
//import Route from './components/AuthRoute'; // TODO: Enable when we have Auth working
import './common/assets/styles/index.css';

// Redux and react-router
import {Route} from 'react-router'; // TODO: Disable when we have Auth working
import {ConnectedRouter} from 'react-router-redux';
import {Provider} from 'react-redux'
import configureStore, {history} from './common/store/configureStore';
const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App>
        <Route exact={true} path="/" component={Home}/>
        <Route path="/store" component={Store}/>
        <Route path="/survey" component={Survey} />
        <Route path="/modal" component={Modal} />
        <Route path="/done" component={SurveyDone} />
      </App>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);
