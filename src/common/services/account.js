/**
 * Created by lokendra on 30/06/17.
 */
import {ACCOUNT} from '../constants';
import {handleFetch} from './handlers';

export function getAccountList(username, password) {
    const url = `${ACCOUNT.ACCOUNT}/?`;

    const params = {
        username,
        password
    };

    const esc = encodeURIComponent;
    const query = Object.keys(params)
        .map(k => `${esc(k)}=${esc(params[k])}`)
        .join('&');
        
    const options = {
        method: 'GET',
        cred: query
    };

    return handleFetch(url + query, options)
}
