import React from 'react';
import Breadcrumb from '../../components/Breadcrumb';
import Loading from '../../components/Loading';
import './styles.scss';
import {connect} from 'react-redux';
import {getZoneList} from '../../common/services/zone';
import {getAllMarketInZone, getAllFcInMarket} from '../../common/services/market';
import {ROLES} from '../../common/constants';
import HomeItem from './HomeItem';
import {setCurrentRole} from '../../common/actions/user';
import {addBreadcrumb} from '../../common/actions/roleBreadcrumbs';
import ErrorComponent from '../../components/ErrorComponent';
class Home extends React.Component {

  state = {
    loading: true,
    roleBreadcrumbs: [],
    zoneLeaderList: [],
    marketManagersList: [],
    fcList: [],
    fcAccountList: [],
    salt: '',
    signature: '',
    listHeader: '',
    currentSfId: null,
    isError: false,
    errorText: ''
  };

  componentWillReceiveProps(nextProps) {
    this.populate(nextProps.user);
  }

  componentDidMount() {
    const {dispatch, user, roleBreadcrumbs} = this.props;
    // Initial load
    if (roleBreadcrumbs.length === 0) {
      dispatch(addBreadcrumb('Overview', {
        name: user.currentRole,
        roleSfId: user.selectedRoleSfId || user.userSfid
      }, this.getTitleForRole(user.currentRole)));
    }
  }

  getTitleForRole = (currentRole) => {
    if (currentRole === ROLES.HQ_MANAGER) {
      return 'Zone Leaders';
    } else if (currentRole === ROLES.ZONE_LEADER) {
      return 'Market Managers';
    } else if (currentRole === ROLES.MARKET_MANAGER) {
      return 'Field Consultants';
    }
  };

  populate = (user) => {
    let currentRole = user.currentRole;
    let state = Object.assign({}, this.state);
    let stateCollectionName = '';
    let populatePromise = null;
    //let isInitialLoad = user.selectedRoleSfId === null;
    this.setState({loading: true});
    state.listHeader = this.getTitleForRole(currentRole);
    if (currentRole === ROLES.HQ_MANAGER) {
      stateCollectionName = 'zoneLeaderList';
      populatePromise = getZoneList(user.salt, user.signature, user.uid)
    } else if (currentRole === ROLES.ZONE_LEADER) {
      stateCollectionName = 'marketManagersList';
      populatePromise = getAllMarketInZone(user.uid, user.salt, user.signature, user.selectedRoleSfId || user.userSfid);
    } else if (currentRole === ROLES.MARKET_MANAGER) {
      stateCollectionName = 'fcList';
      populatePromise = getAllFcInMarket(user.uid, user.salt, user.signature, user.selectedRoleSfId || user.userSfid);
    }

    console.log(populatePromise);

    if (populatePromise != null) {
      populatePromise
        .then(response => {
          let stateCollection = stateCollectionName !== 'fcList' ? response : response.field_consultants;
          state[stateCollectionName] = stateCollection;
          state.loading = false;
          state.isError = false;
          state.errorText = '';
          this.setState(state);
        }).catch(error => {
          state.loading = false;
          state.isError = true;
          state.errorText = error.toString();
          this.setState(state);
        });
    } else {
      state.loading = false;
      state.isError = true;
      state.errorText = 'There is some error, Please try again.';
      this.setState(state);
    }
  };

  /**
   * Method use to store the current role in state
   */
  setSelectedRole = (role, selectedRoleSfId, title) => {
    const {dispatch} = this.props;
    let label = '';
    let breadcrumbRole = {name: role, roleSfId: selectedRoleSfId};
    dispatch(setCurrentRole(role, selectedRoleSfId));
    if (role === ROLES.ZONE_LEADER) {
      label = 'Zone Leaders';
      dispatch(addBreadcrumb(label, breadcrumbRole, title));
      this.setState({listHeader: 'Market Managers'});
    } else if (role === ROLES.MARKET_MANAGER) {
      label = 'Market Managers';
      dispatch(addBreadcrumb(label, breadcrumbRole, title));
      this.setState({listHeader: 'Field Consultants'});
    }
  };

  /**
   * Method shows item data according to roles in ui
   * @param pSid
   * @param pName
   * @param id
   * @param name
   * @param countSurveysAvailable
   * @param role
   * @param setRole
   * @returns {XML}
   */

  renderListRow = (index, pSid, pName, id, name, countSurveysAvailable, role, setRole, unassigned_stores) => {
    const {dispatch} = this.props;
    return <HomeItem key={index}
                     index={index}
                     dispatch={dispatch}
                     pName={pName} pSid={pSid} //Manager id, name eg. zone leader id, name.
                     name={name} id={id} // Self id eg. zone id, name
                     role={role} change_roles={setRole} //Current role and method that change role
                     countSurveysAvailable={countSurveysAvailable} // For Case of Fc show the count of available surveys shown into badge.
                     unassigned_stores={unassigned_stores}
    />;
  };

  render() {
    const {user, roleBreadcrumbs} = this.props;
    return (
      <div>
        <div className="App">

          {!this.state.loading &&
          <section className="fc_container _inventory">
            <Breadcrumb title={roleBreadcrumbs[roleBreadcrumbs.length - 1].title}/>

            <div className="fc_block --wrapper">

              {user.currentRole === ROLES.HQ_MANAGER && this.state.zoneLeaderList.map((zone, index) => {
                return this.renderListRow(index, zone.zone_sfid, zone.zone_name, zone.zone_leader_sfid, zone.zone_leader_name, null, user.currentRole, this.setSelectedRole, null);
              })
              }

              {user.currentRole === ROLES.ZONE_LEADER && this.state.marketManagersList.map((zoneLeader, index) => {
                return this.renderListRow(index, zoneLeader.market_sfid, zoneLeader.market_name, zoneLeader.market_manager_sfid, zoneLeader.market_manager_name, null, user.currentRole, this.setSelectedRole, null);
              })
              }

              {user.currentRole === ROLES.MARKET_MANAGER && this.state.fcList.map((market, index) => {
                return this.renderListRow(index, null, null, market.sfid, market.name, market.countSurveysAvailable, user.currentRole, this.setSelectedRole, market.unassigned_stores);
              })
              }

              {user.currentRole === ROLES.FIELD_CONSULTANTS && this.state.fcAccountList.map((fcUser, index) => {
                return this.renderListRow(index, fcUser.market_sfid, fcUser.market_name, fcUser.fc_sfid, fcUser.name, fcUser.countSurveysAvailable, user.currentRole, this.setSelectedRole, null);
              })
              }
            </div>
          </section>
          }

          {this.state.loading &&
          <Loading />
          }
        </div>

        {this.state.isError && <ErrorComponent errorMessage={this.state.errorText}/>}
      </div>
    );
  }
}
;


function mapStateToProps(state) {
  const {user, routing, roleBreadcrumbs} = state;
  return {
    user,
    routing,
    roleBreadcrumbs
  };
}

export default connect(mapStateToProps)(Home);
