/**
 * Created by kamalkant on 18/05/17.
 */
import * as UserActions from '../actions/user';

const initialState = {
};

export const user = (state = initialState, action) => {
  switch (action.type) {
    case UserActions.SET_USER_INFORMATION:
      return Object.assign({}, state, {
        ...action.user
      });
    case UserActions.SET_CURRENT_ROLE:
      return Object.assign({}, state, {
        currentRole: action.currentRole,
        selectedRoleSfId: action.selectedRoleSfId
      });
    default:
      return state;
  }
};
