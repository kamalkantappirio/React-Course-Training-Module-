/**
 * Created by kamalkant on 15/05/17.
 */
import {ENVIRONMENT, ZONE, MARKET, STORE} from '../constants';
import {handleFetch}  from './handlers';

export function getAllMarketInZone(uId, salt, signature, zoneLeaderSfId) {
  const url = `${ENVIRONMENT.API_ROOT}${ZONE.ZONE_LIST}` + (zoneLeaderSfId ? `/${zoneLeaderSfId}` : '');
  const options = {
    method: 'GET',
    headers: {
      'Salt': salt,
      'Signature':signature,
      'uid': uId,
    }
  };

  return handleFetch(url, options)
}


export function getAllFcInMarket(uId, salt, signature, marketManagerSfid) {
  const url = `${ENVIRONMENT.API_ROOT}${MARKET.FC_LIST_IN_MARKET}` + marketManagerSfid;
  const options = {
    method: 'GET',
    headers: {
      'Salt': salt,
      'Signature':signature,
      'uid': uId,
    }
  };

  return handleFetch(url, options)
}

export function getAllAccountsFieldConsultant(uId,salt, signature, fcSfid) {
  const url = `${ENVIRONMENT.API_ROOT}${STORE.STORE_LIST}` + fcSfid;
  const options = {
    method: 'GET',
    headers: {
      'Salt': salt,
      'Signature':signature,
      'uid': uId,
    }
  };

  return handleFetch(url, options)
}