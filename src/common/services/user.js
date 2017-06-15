/**
 * Created by kamalkant on 15/05/17.
 */
import {ENVIRONMENT, USER} from '../constants';
import {handleFetch}  from './handlers';

export function getSaltSignature(token) {
  const url = `${ENVIRONMENT.AUTH_API_ROOT}/auth/signature`;
  const options = {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  };

  return handleFetch(url, options)
}

export function getUserDetail(uid, salt, signature) {
  const url = `${ENVIRONMENT.API_ROOT}${USER.USER}`;
  const options = {
    method: 'GET',
    headers: {
      'Salt': salt,
      'Signature': signature,
      'uid': uid,
    }
  };

  return handleFetch(url, options)
}

