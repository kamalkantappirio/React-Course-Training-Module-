/**
 * Created by lokendra on 30/06/17.
 */
import { END_POINT } from '../constants';
import { handleFetch } from './handlers';
import { queryBuilder } from '../utils/strings.js';

export function getAccount(username, password) {
    const url = `${END_POINT.ACCOUNT}/?`;
    const params = {
        username,
        password
    };

    const query = queryBuilder(params);
    const options = {
        method: 'GET',
        cred: query
    };

    return handleFetch(url + query, options);
}

export function requestEnd(endpoint, params = null, data = null) {
    const qs = params ? queryBuilder(params) : '';
    const url = `${END_POINT[endpoint]}`;
    const options = {
        method: 'GET',
        data
    };

    return handleFetch(url + qs, options);
}