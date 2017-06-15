/**
 * Created by kamalkant on 25/05/17.
 */

import {ENVIRONMENT, SURVEY} from '../constants';
import {handleFetch}  from './handlers';

export function getAllSurveysInAccount(store_number, salt, signature, uid) {
  const url = `${ENVIRONMENT.API_ROOT}${SURVEY.LIST_ALL_SERVICE_IN_ACCOUNT}` + store_number + '/survey';
  console.log(url);
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

export function getASubmission(submissionPgid, salt, signature, uid) {
  return new Promise(
    (resolve, reject) => {
      const url = `${ENVIRONMENT.API_ROOT}${SURVEY.GET_A_SUBMISSION}` + submissionPgid;
      const options = {
        method: 'GET',
        headers: {
          'Salt': salt,
          'Signature': signature,
          'uid': uid
        }
      };

      handleFetch(url, options)
        .then(response => {
          return resolve(response);
        })
        .catch(error => {
          return reject(error);
        })
    }
  );
}

export function createASubmission(accountSfId, surveySfid,fc_sfid, salt, signature, uid) {
  const url = `${ENVIRONMENT.API_ROOT}${SURVEY.CREATE_A_SUBMISSION}${accountSfId}${SURVEY.SURVEY}${surveySfid}${SURVEY.SUBMISSION}`;
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Salt': salt,
      'Signature': signature,
      'uid': uid
    },
    body: JSON.stringify({data: fc_sfid})
  };

  return handleFetch(url, options)
}

/**
 * Method use to update the submission data
 * @param salt
 * @param signature
 * @param uid
 * @param submissionPgid
 * @param data
 * @returns {Promise}
 */
export function updateSubmission(salt, signature, uid, submissionPgid, data) {
  const url = `${ENVIRONMENT.API_ROOT}${SURVEY.UPDATE_SUBMISSION}` + submissionPgid;
  return new Promise(
    (resolve, reject) => {
      const options = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Salt': salt,
          'Signature': signature,
          'uid': uid
        },
        body: JSON.stringify({data: data})
      };

      handleFetch(url, options)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    }
  );
}
