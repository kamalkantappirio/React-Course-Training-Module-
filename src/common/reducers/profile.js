import * as ProfileActions from '../actions/profile';

const initialState = {};

export const profile = (state = initialState, action) => {
  switch (action.type) {
    case ProfileActions.RETRIEVE_PROFILE_FROM_TOKEN:
      return retrieveProfileFromToken(state, action);
     default:
      return state;
  }
};

function retrieveProfileFromToken(state, action) {
  return Object.assign({}, state, action.profile);
}