/**
 * Created by kamalkant on 15/05/17.
 */
import { ENVIRONMENT,  ZONE} from '../constants';
import {handleFetch}  from './handlers';

export function getZoneList(salt, signature, uId) {
  const url = `${ENVIRONMENT.API_ROOT}${ZONE.ZONE_LIST}`;
  const options = {
    method: 'GET',
    headers: {
      'Salt' : salt,
      'Signature' : signature,
      'uid' : uId,
    }
  };

  return handleFetch(url, options)
}

