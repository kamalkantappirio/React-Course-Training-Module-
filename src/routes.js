import React from 'react';
import { Route, Router, IndexRoute } from 'react-router';

import App from './components/App';
import NotFound from './components/NotFound';
import UserCoursesList from './components/UserCoursesList';
import Mapping from './components/Mapping';
import CoursesList from './components/CoursesList';
import CompletedCoursesList from './components/CompletedCoursesList';
import VideoList from './components/VideoList';
import CoursesDetail from './components/CoursesDetail';
import Callback from './components/Callback';
import Welcome from './components/Welcome';
import Notes from './components/Notes';
import Auth from './Auth/Auth';

const auth = new Auth();


const Routes = props =>
    (<Router {...props}>
      <Route path="/callback" component={Callback} {...props} />
      <Route path="/" component={App} auth={auth}>
        <IndexRoute component={Welcome} />
        <Route path="/enrollCourses" component={UserCoursesList} />
        <Route path="/mapping" component={Mapping} />
        <Route path="/courses" component={CoursesList} />
        <Route path="/completedCourses" component={CompletedCoursesList} />
        <Route path="/videos" component={VideoList} />
        <Route path="/detail" component={CoursesDetail} />
        <Route path="/notes" component={Notes} />
        <Route path="*" component={NotFound} />
      </Route>
    </Router>);

export default Routes;
