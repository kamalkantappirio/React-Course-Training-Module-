/**
 * Created by kamalkant on 15/05/17.
 */
import { ENVIRONMENT,  TASK} from '../constants';
import {handleFetch}  from './handlers';

export function getTaskList(salt, signature, uid) {
  const url = `${ENVIRONMENT.API_ROOT}${TASK.GET_TASK_LIST}`;
  const options = {
    method: 'GET',
    headers: {
      'Salt' : salt,
      'Signature' : signature,
      'uid' : uid
    }
  };

  return handleFetch(url, options)
}

export function updateTaskStatus(salt, signature, uid, task_sfid) {
  const url = `${ENVIRONMENT.API_ROOT}${TASK.UPDATE_TASK}`+ task_sfid;;
  const options = {
    method: 'PUT',
    headers: {
      'Salt' : salt,
      'Signature' : signature,
      'uid' : uid
    }
  };

  return handleFetch(url, options)
}