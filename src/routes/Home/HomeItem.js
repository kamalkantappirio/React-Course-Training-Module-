/**
 * Created by kamalkant on 16/05/17.
 */

import React from 'react';
import {ROLES} from '../../common/constants';
import { push } from 'react-router-redux';
import { setCurrentRole } from '../../common/actions/user';
import { addBreadcrumb } from '../../common/actions/roleBreadcrumbs';

class HomeItem extends React.Component {

  /**
   * Method manage row click and show data according role
   * @param rowData
   * @returns {XML}
   */
  onRowItemClick = (pSid, id, role, change_roles, unassigned_stores) => {
    let breadcrumbRole = { name: role, roleSfId: id };
    const { dispatch, name } = this.props;
    if (role === ROLES.HQ_MANAGER) {
      change_roles(ROLES.ZONE_LEADER, id, name);
    }else if (role === ROLES.ZONE_LEADER) {
      change_roles(ROLES.MARKET_MANAGER, id, name, unassigned_stores);
    }  else if (role === ROLES.MARKET_MANAGER) {
      dispatch(setCurrentRole(ROLES.FIELD_CONSULTANTS, id));
      dispatch(addBreadcrumb('Field Consultants', breadcrumbRole));
      dispatch(push('/store',{sfId:id, name, unassignedStores:unassigned_stores}));
    }
  };

  render() {
    const {index, pSid, pName, name, id, role, change_roles, countSurveysAvailable, unassigned_stores} = this.props;
    return (
      <a key={index} onClick={this.onRowItemClick.bind(this, pSid, id, role, change_roles, unassigned_stores)}>
        <div className="fc_block fc_block_item --short">
          <div className="fc_block fc_block--base">
            <div className="fc_block fc_block--header">
              { role === ROLES.HQ_MANAGER ?  <p className="fc_name">{pName}</p> : <p className="fc_name">{name} {role !== ROLES.MARKET_MANAGER && `#${pName}`  }</p>}
              {/*Set the number only in case of FC*/}
              {role === ROLES.MARKET_MANAGER && countSurveysAvailable >0 &&
              <span className="fc_items fc_item_number">{countSurveysAvailable}</span>
              }
            </div>
          </div>
        </div>
      </a>
    );
  }
}

export default HomeItem;