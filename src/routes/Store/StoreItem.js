import React from 'react';
import SurveyItem from './SurveyItem';
import Brandlogo from '../../common/assets/styles/i/logo-horz@3x.png';
import {push} from 'react-router-redux';

class StoreItem extends React.Component {

  storeItemCss = (status) => {
    switch (status) {
      case true:
        return "fc_block fc_block--inventory hidden";
      case false:
        return "fc_block fc_block--inventory";
      default:
        return "fc_block fc_block--inventory hidden";
    }
  };


  /* Sort Survey */

  sortSurvey(surveys) {

    let inProgresSurvey = this.filterByState(surveys, "In Progress");
    let completedSurvey = this.filterByState(surveys, "Complete");
    let expiredSurvey = this.filterByState(surveys, "Expire");

    let availableSurvey = surveys
      .filter(surveyData => {
        if (surveyData) {
          return surveyData.survey_state === null || surveyData.survey_state === "Available";
        }
        return false;
      });

    availableSurvey = this.sortByEndDate(availableSurvey);

    let sortedSurvey
    sortedSurvey = [...inProgresSurvey, ...availableSurvey, ...completedSurvey, ...expiredSurvey];

    return sortedSurvey
  }

  filterByState(surveys, state) {
    let filterSurvey = surveys
      .filter(surveyData => {
        if (surveyData) {
          return surveyData.survey_state === state
        }
        return false;
      });

    return this.sortByEndDate(filterSurvey);
  }

  sortByEndDate(surveys) {
    return surveys.sort((second_surveyData, first_surveyData) => new Date(...first_surveyData.cycle_end_date.split('/').reverse()) - new Date(...second_surveyData.cycle_end_date.split('/').reverse()));
  }


  onRowItemClick = (onStoreItemClick, fcStoreItem) => {
    onStoreItemClick(fcStoreItem)
  };

  onViewAllSurveysButtonClick = (fcStoreItem, fcName) => {
    const {dispatch, sfId} = this.props;
    console.log("View All Called")
    dispatch(push('/survey', {fcStoreItemData: fcStoreItem, fcName, sfId}));
  };



  render() {
    const {dispatch, onStoreItemClick, fcStoreItem, fcName, onSurveyItemClick} = this.props;
    const {account_sfid, store_number, store_type, countsurveysavailable, isCollapsed, availInProgSurveys} = fcStoreItem;
    let availableSurveys = this.sortSurvey(availInProgSurveys || []);
    let isShowViewAllSurvey = false;
    if (availableSurveys.length === 0)
      isShowViewAllSurvey = false;
    else
      isShowViewAllSurvey = isCollapsed;


    return (
      <div className="fc_block fc_block_item --short" key={account_sfid}>
        <div className="fc_block fc_block--base">
          <div className="fc_block fc_block--header"
               onClick={this.onRowItemClick.bind(this, onStoreItemClick, fcStoreItem)}>
            <p className="fc_store">
              <img className="fc_store--img" src={Brandlogo} alt="brand logo"/>
              <span className="fc_store--num">#{store_number}</span>
            </p>
            { store_type !== null  && <span className="fc_store--category">{store_type}</span> }
            { countsurveysavailable > 0 && <span className="fc_item fc_item_number">{countsurveysavailable}</span> }
          </div>
          <div className={this.storeItemCss(isShowViewAllSurvey)}>
            {availableSurveys.length > 0 && <div className="fc_store-status">
              <div>
                <div className="fc_status --progress"><i className="icon_status progress"></i>In Progress</div>
                <div className="fc_status --available"><i className="icon_status available"></i>Available</div>
              </div>
            </div>
            }
            <div className="fc_storelist">
              {/*loop through fc array */}
              {
                availableSurveys.map((surveyData, index) => {
                  return <SurveyItem dispatch={dispatch} key={index} onClick={onSurveyItemClick}
                                     fcStoreItem={fcStoreItem} surveyItemData={surveyData} fcName={fcName}/>
                })
              }
              <div className="fc_storelink">
                <button className="btn cta outline"
                        onClick={this.onViewAllSurveysButtonClick.bind(this, fcStoreItem, fcName)}>View All Surveys
                </button>
              </div>
            </div>
          </div>
          <div className="fc_block fc_block--footer">
            {(fcStoreItem.street != null && fcStoreItem.street !== '') &&
            <address className="fc_store--address">
              <p>{fcStoreItem.street}</p>
              {(fcStoreItem.city != null && fcStoreItem.city !== '') &&
              <p>{fcStoreItem.city}, {fcStoreItem.state} {fcStoreItem.postal_code}</p>
              }
            </address>
            }
          </div>
        </div>
      </div>
    )
  }
}

export default StoreItem;
