import React from 'react';
import { push } from 'react-router-redux';
import Moment from 'moment';

class SurveyItem extends React.Component {

  surveyItemCss = (status, submission_pgid) => {
    console.log(status);
    console.log(submission_pgid);
    if (status === null || submission_pgid === null) {
      status = 'Available';
    }
    console.log(status);
    switch (status) {
      case 'In Progress':
        return "fc_store fc_store--status ";
      case 'Available':
        return "fc_store fc_store--status is-available";
      default:
        return "";
    }
  };


  render() {
    const {fcStoreItem, surveyItemData, fcName, onClick} = this.props;
    return (
      <div key={surveyItemData.survey_sfid} className="fc_storelist--item" onClick={onClick.bind(null, fcStoreItem, surveyItemData, fcName)}>
        <div className={this.surveyItemCss(surveyItemData.survey_state, surveyItemData.submission_pgid)}></div>
        <div className="fc_store fc_store--info">
          <p className="fc_store fc_store--title">
            <span className="fc_title--pre">{surveyItemData.cycle_start_date != null ? Moment(surveyItemData.cycle_end_date).format('MM/DD/YYYY') : '00'}</span>
            <span className="fc_title--main">{surveyItemData.survey_name}</span>
          </p>
        </div>
      </div>
    );
  }
}

export default SurveyItem;
