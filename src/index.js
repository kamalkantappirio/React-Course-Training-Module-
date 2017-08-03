import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router';
// import register from './registerServiceWorker';
import './common/assets/css/bootstrap.min.css';
import './common/assets/css/sb-admin.css';
import './common/assets/css/plugins/morris.css';
import './common/assets/font-awesome/css/font-awesome.min.css';


import Routes from './routes';

require('dotenv').config();

ReactDOM.render(<Routes history={browserHistory} />, document.getElementById('root'));
// register();
