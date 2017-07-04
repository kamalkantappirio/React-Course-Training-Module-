import React from 'react';
import {Router, Route} from 'react-router'

import App from './components/App';
import About from './components/About';
import NotFound from './components/NotFound';
import Home from './components/Home';


const Routes = (props) => (
    <Router {...props}>
        <Route path="/" component={App}/>
        <Route path="/home" component={Home}/>
        <Route path="/about" component={About}/>
        <Route path="/callback" component={About}/>
        <Route path="*" component={NotFound}/>
    </Router>
);

export default Routes;
