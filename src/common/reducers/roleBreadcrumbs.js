/**
 * Created by kamalkant on 18/05/17.
 */
import * as actions from '../actions/roleBreadcrumbs';

const initialState = [];

export const roleBreadcrumbs = (state = initialState, action) => {
  switch (action.type) {
    case actions.ADD_BREADCRUMB:
      return addBreadcrumb(state, action);
    case actions.NAVIGATE_TO_BREADCRUMB:
      return navigateToBreadcrumb(state, action);
    default:
      return state;
  }
};

function addBreadcrumb(state, action) {
  let breadcrumbs = state.slice();
  breadcrumbs.push(action.breadcrumb);
  return breadcrumbs;
}

function navigateToBreadcrumb(state, action) {
  let breadcrumbIndex = state.findIndex(breadcrumb => {
    return breadcrumb.role.name === action.role.name
  });

  if (breadcrumbIndex > 0) {
    return state
      .slice(0, breadcrumbIndex + 1);
  } else {
    return state.slice(0, 1);

  }
}