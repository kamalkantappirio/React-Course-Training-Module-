import React from 'react';
import Breadcrumb from '../../components/Breadcrumb';
import StoreItem from './StoreItem';
import {getStoreDetailList} from '../../common/services/store';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';
import Loading from '../../components/Loading';
import { createASubmission } from '../../common/services/survey';

class Store extends React.Component {
  static isPrivate = true;

  state = {
    loading: false,
    sfId: null,
    storeList: '',
    accountList: []
  };

  componentDidMount() {
    const { user, dispatch } = this.props;
    if (!user.userRole) {
      dispatch(push('/'));
    } else {
      const sfId = this.props.location.state.sfId || user.selectedRoleSfId;
      const isUnassignedStores = this.props.location.state.unassignedStores;
      if(sfId != null){
        //Get the store list

        this.findStoreDetailList(sfId, isUnassignedStores);
      }
    }
  }

  onClickCollapseStoreItem = (rowData) => {
    let fcStoreList = this.state.accountList;
    fcStoreList
      .forEach(store => {
        if (store.store_number === rowData.store_number) {
          store.isCollapsed = !rowData.isCollapsed
        }
        else {
          store.isCollapsed = true;
        }
      });
    this.setState({accountList: fcStoreList});
  };


  /**
   * Method use to handle loading
   * @param isLoading
   */
  setLoading = (isLoading) => {
    this.setState({loading: isLoading});
  };

  onSurveyItemClick = (fcStoreItem, surveyItemData, fcName) => {
    const { dispatch, user } = this.props;
    const fcStore = {fc_sfid: this.props.location.state.sfId};

   // surveyItemData.survey_state = null;

    if (!surveyItemData.survey_state) {
      createASubmission(surveyItemData.account_sfid, surveyItemData.survey_sfid, fcStore, user.salt, user.signature, user.uid)
        .then(() => {
          dispatch(push('/survey', {fcStoreItemData:fcStoreItem, fcName:fcName, activeSurveyData:surveyItemData}));
        })
        .catch(error => {
          console.error(error);
        });
    } else {
      dispatch(push('/survey', {fcStoreItemData:fcStoreItem, fcName:fcName,activeSurveyData:surveyItemData}));
    }
  };

  /**
   * Method use to get the store detail list
   */
  findStoreDetailList = (sfId, isUnassignedStores) => {
    const { user } = this.props;
    let state = Object.assign({}, this.state);
    const setLoading = this.setLoading;
    setLoading(true);

    //If user directly login with fc then unassigned stores should be false.
    if(isUnassignedStores === null){
      isUnassignedStores = false;
    }

    getStoreDetailList(sfId, user.salt, user.signature, user.uid, isUnassignedStores)
      .then(storeDetailListData => {
        console.log(storeDetailListData);

        setLoading(false);
        if (storeDetailListData != null) {
          state.sfId = sfId;
          state.storeList = storeDetailListData;
          let storeAccountList = storeDetailListData.accounts;
          storeAccountList
            .forEach(store => {
              store.isCollapsed = true;
          });
          state.accountList=storeAccountList;
          this.setState(state);
        }
      })
      .catch(error => {
        setLoading(false);
      })
  };

  onBreadcrumbPress = () => {
    const { dispatch } = this.props;
    dispatch(push('/'));
  };

  render() {
    const {dispatch, user} = this.props;
    return (
      <div className="App">
        {!this.state.loading && user.userRole &&
        <section className="fc_container _inventory">
          <Breadcrumb title={this.state.storeList.name} onPress={this.onBreadcrumbPress} addStore="true"/>
          <div className="fc_block --wrapper">
          {this.state.accountList != null && this.state.accountList.length >0 && this.state.accountList.map((storeData, index) => {
            return <StoreItem dispatch={dispatch} key={index} user={user} fcStoreItem={storeData} onSurveyItemClick={this.onSurveyItemClick}
                              onStoreItemClick={this.onClickCollapseStoreItem} sfId={this.state.sfId} fcName={this.state.storeList.name}/>
          })
            
          }
          </div>
        </section>
        }
        {this.state.loading &&
        <Loading />
        }

      </div>
    );
  }
}



function mapStateToProps(state) {
  const {user} = state;
  return {
    user
  };
}

export default connect(mapStateToProps)(Store);

