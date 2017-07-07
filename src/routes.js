import React from "react";
import { Router, Route } from "react-router";

import NotFound from "./components/NotFound";
import Home from "./components/Home";

const Routes = props =>
  <Router {...props}>
    <Route path="/" component={Home} />
    <Route path="*" component={NotFound} />
  </Router>;

export default Routes;
