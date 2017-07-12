import React from 'react';
import { Router, Route } from 'react-router';

import App from './components/App';
import NotFound from './components/NotFound';
import Home from './components/Home';
import Mapping from './components/Mapping';

const Routes = props =>
  <Router {...props}>
    <Route path="/" component={App} />
    <Route path="/home" component={Home} />
    <Route path="/mapping" component={Mapping} />
    <Route path="*" component={NotFound} />
  </Router>;

export default Routes;
