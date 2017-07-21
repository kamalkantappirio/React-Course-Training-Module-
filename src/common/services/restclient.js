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
    body: JSON.stringify({
      accessToken: localStorage.getItem('accessToken'),
      instanceUrl: localStorage.getItem('instanceUrl')
    })
  };

  return handleFetch(url, options);
}

export function getAccountListWithMapping() {
  const url = `${API_CONST.ACCOUNT}`;

  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      accessToken: localStorage.getItem('accessToken'),
      instanceUrl: localStorage.getItem('instanceUrl'),
      param: [{ field: 'name' }, { field: 'address' }, { field: 'goals' }]
    })
  };

  return handleFetch(url, options);
}


export function Logout() {
  const url = `${API_CONST.LOGOUT}`;

  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      accessToken: localStorage.getItem('accessToken'),
      instanceUrl: localStorage.getItem('instanceUrl'),

    })
  };

  return handleFetch(url, options);
}

export function getAccountMapping() {
  const url = `${API_CONST.MAPPING}?userId=${localStorage.getItem('userId')}`;

  const options = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }

  };

  return handleFetch(url, options);
}


export function getAccountApi() {
  const url = `${API_CONST.FIELDS}`;

  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      accessToken: localStorage.getItem('accessToken'),
      instanceUrl: localStorage.getItem('instanceUrl'),
      userId: localStorage.getItem('userId')
    })
  };


  return handleFetch(url, options);
}

export function updateAccountMapping(data) {
  const url = `${API_CONST.MAPPING}`;

  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
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
  const url = `${window.location.protocol}${document.domain}:${window.location.port}${API_CONST.LOGIN}`;
  return window.open(url, '_self');
}
