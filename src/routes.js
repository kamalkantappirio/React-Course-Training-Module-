import React from 'react';
import { Route, Router, IndexRoute } from 'react-router';

import App from './components/App';
import NotFound from './components/NotFound';
import Home from './components/Home';
import Mapping from './components/Mapping';

const Routes = props =>
    (<Router {...props}>
      <Route path="/" component={App} >
        <IndexRoute path="/home" component={Home} />
        <Route path="/mapping" component={Mapping} />
        <Route path="*" component={NotFound} />
      </Route>
    </Router>);

export default Routes;
