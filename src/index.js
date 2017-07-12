import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router';

import Routes from './routes';
import './common/assets/styles/style.css';
import './common/assets/styles/index.css';

require('dotenv').config();

ReactDOM.render(<Routes history={browserHistory} />, document.getElementById('root'));
