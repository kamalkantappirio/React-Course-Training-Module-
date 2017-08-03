import React from 'react';
import { Route, Router, IndexRoute } from 'react-router';

import App from './components/App';
import NotFound from './components/NotFound';
import Home from './components/Home';
import Mapping from './components/Mapping';
import CoursesList from './components/CoursesList';
import CompletedCoursesList from './components/CompletedCoursesList';
import VideoList from './components/VideoList';
import CoursesDetail from './components/CoursesDetail';
import Callback from './components/Callback';
import Auth from './Auth/Auth';

const auth = new Auth();
const handleAuthentication = (nextState) => {
  if (/access_token|id_token|error/.test(nextState.location.hash)) {
    auth.handleAuthentication();
  }
};

const Routes = props =>
    (<Router {...props}>
      <Route path="/" component={App} auth={auth}>
        <IndexRoute component={Home} />
        <Route path="/mapping" component={Mapping} />
        <Route path="/courses" component={CoursesList} />
        <Route path="/completedCourses" component={CompletedCoursesList} />
        <Route path="/videos" component={VideoList} />
        <Route path="/detail" component={CoursesDetail} />
        <Route
          path="/callback"
          component={() => {
            handleAuthentication(props);
            return <Callback {...props} />;
          }}
        />
        <Route path="*" component={NotFound} />
      </Route>
    </Router>);

export default Routes;
