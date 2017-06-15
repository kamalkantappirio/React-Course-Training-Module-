import {getUserDetail, getSaltSignature} from '../services/user';
import {LOCAL_STORAGE} from '../constants';

export const SET_USER_INFORMATION = 'SET_USER_INFORMATION';
export const SET_CURRENT_ROLE = 'SET_CURRENT_ROLE';

export function setUserFromToken(token) {
  return (dispatch, store) => {
    let state = {};
    let userAuth = {};
    getSaltSignature(token)
      .then(response => {
        // This is a proper user, persist the token
        localStorage[LOCAL_STORAGE.TOKEN] = token;
        userAuth = response;
        return getUserDetail(response.uid, response.salt, response.signature)
      })
      .then(userDetail => {
        state = Object.assign({}, state, userAuth, {
          userSfid: userDetail.user_sfid,
          userName: userDetail.user_name,
          userEmail: userDetail.user_email,
          userRole: userDetail.user_role,
          currentRole: userDetail.user_role
        });

        dispatch(setUserDetail(Object.assign({}, state)));
      })
      .catch(error => {
        state = Object.assign({}, state, userAuth, {
          error: error
        });

        dispatch(setUserDetail(Object.assign({}, state)));

        /*dispatch({
          type: SET_USER_INFORMATION,
          error
        });*/
      })
  }
};

export function setUserDetail(user) {
  return (dispatch, store) => {
    dispatch({
      type: SET_USER_INFORMATION,
      user
    });
  }
}

export function setCurrentRole(currentRole, selectedRoleSfId) {
  return (dispatch, store) => {
    dispatch({
      type: SET_CURRENT_ROLE,
      currentRole,
      selectedRoleSfId
    });
  }
}
