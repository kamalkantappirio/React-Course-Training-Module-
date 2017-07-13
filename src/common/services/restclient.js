/**
 * Created by lokendra on 30/06/17.
 */
import { API_CONST } from '../constants';
import { handleFetch } from './handlers';

export function getAccountList() {
  const url = `${API_CONST.ACCOUNT}`;

  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ accessToken: localStorage.getItem('accessToken'), instanceUrl: localStorage.getItem('instanceUrl') })
  };

  return handleFetch(url, options);
}

export function getAccountMapping() {
  const url = `${API_CONST.MAPPING}`;

  const options = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  };

  return handleFetch(url, options);
}

export function userLogin(username, password) {
  const url = `${API_CONST.LOGIN}`;

  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  };

  return handleFetch(url, options);
}

export function authLogin() {
  const url = `${API_CONST.LOGIN}`;
  return window.open(process.env.API_ROOT + url, '_self');
}
