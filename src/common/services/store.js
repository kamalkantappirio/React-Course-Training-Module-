/**
 * Created by kamalkant on 15/05/17.
 */
import { ENVIRONMENT,  STORE} from '../constants';
import {handleFetch}  from './handlers';

export function getStoreDetailList(fc_sfid, salt, signature, uid, isUnassignedStores) {
  const url = `${ENVIRONMENT.API_ROOT}${STORE.STORE_LIST}`+fc_sfid+`?unassigned_stores=`+isUnassignedStores;
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