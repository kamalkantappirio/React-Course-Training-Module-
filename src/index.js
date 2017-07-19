import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router';
// import register from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.css';
import Routes from './routes';
import './common/assets/styles/index.css';
import './common/assets/styles/style.css';


require('dotenv').config();

ReactDOM.render(<Routes history={browserHistory} />, document.getElementById('root'));
// register();
