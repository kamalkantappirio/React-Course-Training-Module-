import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { profile } from './profile';
import { user } from './user';
import { roleBreadcrumbs } from './roleBreadcrumbs';

const rootReducer = combineReducers({
  profile,
  user,
  roleBreadcrumbs,
  routing: routerReducer,
});

export default rootReducer;
