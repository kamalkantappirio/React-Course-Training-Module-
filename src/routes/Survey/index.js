import React from 'react';
import Sidebar from '../../components/Sidebar';
import Loading from '../../components/Loading';
import Moment from 'moment';
import {
  getAllSurveysInAccount,
  getASubmission,
  createASubmission,
  updateSubmission
} from '../../common/services/survey';
import QuestionPanel from '../../components/QuestionPanel';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';
import {QUESTION_TYPE} from '../../common/constants';
import {NEAR_BY_STORE} from '../../common/constants';

const initialState = {
  status: 'online',
  loading: false,
  fcStoreItemData: '',
  fcName: '',
  surveysList: [],
  surveySubmission: {
    questions: []
  },
  endDate: '',
  isRowClick: false,
};

class Survey extends React.Component {
  state = initialState;

  organizeQuestionHierarchy(submission) {
    let duplicateQuestions = [];
    submission.questions
      .forEach(question => {
        return this.traverseQuestionHierarchy(question, submission.questions, duplicateQuestions);
      });

    // Remove all the questions that are part of a hierarchy off the top level
    submission.questions = submission.questions
      .filter(question => {
        return duplicateQuestions.indexOf(question.question_sfid) < 0;
      });
    return submission;
  }

  traverseQuestionHierarchy(question, questions, duplicateQuestions) {
    question.children = questions
      .filter(existingQuestion => {
        return existingQuestion.parent_id === question.question_sfid;
      })
      .map(childQuestion => {
        duplicateQuestions.push(childQuestion.question_sfid);

        // Recurse downwards
        childQuestion.children = this.traverseQuestionHierarchy(childQuestion, questions, duplicateQuestions);
        return childQuestion;
      });

    return question;
  }

  flatten(questions, flattenedArray = []) {
    questions.forEach(question => {
      let copiedQuestion = Object.assign({}, question);
      delete copiedQuestion.children;
      flattenedArray.push(copiedQuestion);
      if (question.children.length > 0) {
        this.flatten(question.children, flattenedArray);
      }
    });

    return flattenedArray;
  }

  componentDidUpdate(prevProps, prevState) {
    // This will handle all updates to question submissions
    const {surveySubmission} = this.state;
    if (surveySubmission.submission_pgid && (surveySubmission.submission_status === 'In Progress' || !surveySubmission.submission_status)) {
      let flattenedQuestions = this.flatten(surveySubmission.questions);
      let pos = 0;
      for(pos = 0 ; pos < flattenedQuestions.length ; pos++){
        flattenedQuestions[pos].children = [];
      }

      let today = new Date();
      surveySubmission.lastmodifieddate = today.toISOString();
      surveySubmission.questions = flattenedQuestions;
      this.updateCache(surveySubmission);
    }
  }

  componentDidMount() {
    const {user, dispatch} = this.props;

    window.addEventListener('offline', () => {
      this.setState({
        status: 'offline'
      });
    });

    window.addEventListener('online', () => {
      this.setState({
        status: 'online'
      });
    });

    if (!user.userRole) {
      dispatch(push('/'));
    } else {
      const fcName = this.props.location.state.fcName;
      const fcStoreItem = this.props.location.state.fcStoreItemData;
      if (fcStoreItem != null) {
        let state = Object.assign({}, this.state);
        state.fcStoreItemData = fcStoreItem;
        state.fcName = fcName;
        this.setState(state);

        //get all surveys for this account
        this.findAllSurveysInAccount(fcStoreItem.store_number);
      }
    }

  };

  /**
   * Method use to handle loading
   * @param isLoading
   */
  setLoading = (isLoading) => {
    let state = Object.assign({}, this.state);
    state.loading = isLoading;
    this.setState(state);
  };


  /**
   /**
   * Method use to get all the surveys in account
   */
  findAllSurveysInAccount = (storeNumber) => {
    const {user} = this.props;
    const activeSurveyData = this.props.location.state.activeSurveyData;
    const setLoading = this.setLoading;
    setLoading(true);
    getAllSurveysInAccount(storeNumber, user.salt, user.signature, user.uid)
      .then(response => {
        let surveys = response.surveys || [];
        surveys = surveys.map((item) => {
          return Object.assign({}, item, {isActive: false});
        });

        let surveySubmissionsForCaching = surveys
          .filter(survey => {
            return !survey.survey_state || survey.survey_state === 'In Progress'
          });

        // TODO: The line below eager caches all In Progress or Available surveys. This is causing connection pool issues w/ the backend, so we are disabling for now
        //this.cacheSurveySubmissions(surveySubmissionsForCaching);

        this.setState({surveysList: surveys, isRowClick: false, loading: false});
        if (activeSurveyData !== null) {
          this.callSubmissionService(activeSurveyData);
        }
      })
      .catch(error => {
        setLoading(false);
      })
  };

  cacheSurveySubmissions = (submissions) => {
    const {user} = this.props;
    let getSubmissionPromises = submissions.map(submission => {
      return getASubmission(submission.submission_pgid, user.salt, user.signature, user.uid);
    });

    Promise.all(getSubmissionPromises)
      .then(results => {
        results.forEach(submission => {
          this.updateCache(submission);
        })
      })
      .catch(error => {
      })
  };

  /**
   * Adds/Updates the local cache (if necessary) for a submission
   * @param submission
   */
  updateCache = (submission) => {
    let submissionLastModifiedDate = new Date(submission.lastmodifieddate);

    // Only update the cache if the submission has fresher data than local
    if (localStorage[`SUBMISSION_${submission.submission_pgid}`]) {
      let cachedSubmission = JSON.parse(localStorage[`SUBMISSION_${submission.submission_pgid}`]);
      let cachedSubmissionLastModifiedDate = new Date(cachedSubmission.lastmodifieddate);
      if (cachedSubmissionLastModifiedDate < submissionLastModifiedDate) {
        localStorage[`SUBMISSION_${submission.submission_pgid}`] = JSON.stringify(submission);
      }
      return;
    }

    // Doesn't exist, add it
    localStorage[`SUBMISSION_${submission.submission_pgid}`] = JSON.stringify(submission);

    return;
  };


  updateSideRowSurveyState = (submission_pgid,submission_status) =>{
    let surveysList = this.state.surveysList;
    surveysList = surveysList.map((item) => {
      if(item.submission_pgid === submission_pgid){
        item.survey_state = submission_status;
      }
    });
    this.setState({ surveysList });
  }

  /**
   * Retrieves from the local cache (if necessary) for a submission
   * @param submission
   */
  retrieveLatest(submission) {
    if (localStorage[`SUBMISSION_${submission.submission_pgid}`]) {
      let cachedSubmission = JSON.parse(localStorage[`SUBMISSION_${submission.submission_pgid}`]);
      // TODO: Enable logic below once server side lastmodifieddate field is fixed
      let cachedSubmissionLastModifiedDate = new Date(cachedSubmission.lastmodifieddate);
      let submissionLastModifiedDate = new Date(submission.lastmodifieddate);
       if (cachedSubmissionLastModifiedDate > submissionLastModifiedDate) {
         return cachedSubmission;
       }

       return submission;
      return cachedSubmission;
    }
    return submission;
  }

  /**
   * Method use call the submission services.
   */
  callSubmissionService = (surveyItemData) => {
    if (surveyItemData !== null) {
      //Check date
      let dueDate = null;
      if (surveyItemData.survey_state != null && surveyItemData.survey_state === 'Complete') {
        dueDate =  this.convertUTCDateToLocalDate(new Date(surveyItemData.lastmodifieddate));
      } else {
        dueDate =  Moment(surveyItemData.cycle_end_date).format('MM/DD/YYYY');
      }

      let state = Object.assign({}, this.state);
      state.isRowClick = false;
      state.loading = true;
      this.setState(state);


      // The assumption is the submission has already been created before getting to this point
      this.getSubmission(surveyItemData.submission_pgid, dueDate);
    }
  };

  isGPSAvailable = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.showPosition);
      return true
    }
    return false
  }

  showPosition = (position) => {
    console.log(position.coords.latitude + " / " + position.coords.longitude);
    this.isFCNearByStore(position)
  }

  isFCNearByStore = (position) => {


  }

  convertUTCDateToLocalDate = (date) => {
    var newDate = new Date(date.getTime()+date.getTimezoneOffset()*60*1000);

    var offset = date.getTimezoneOffset() / 60;
    var hours = date.getHours();

    newDate.setHours(hours - offset);

    return Moment(newDate).format('MM/DD/YYYY HH:mm:ss');
  }
 
  /**
   * Method use to get a submission
   * @param submissionPgid
   */
  getSubmission = (submissionPgid, dueDate) => {
    const {user} = this.props;
    let state = Object.assign({}, this.state);
    getASubmission(submissionPgid, user.salt, user.signature, user.uid)
      .then(response => {
        // Grab a cached copy if necessary
        if (response.submission_status === 'In Progress' || !response.submission_status) {
          response = this.retrieveLatest(response);
        }

        response = this.organizeQuestionHierarchy(response);
        state.loading = false;
        if (!response.error) {
          state.isRowClick = true;
          state.endDate = dueDate;
          state.surveySubmission = response;
        } else {
          state.isRowClick = false;
          alert(response.error)
        }

        this.setState(state);
      })
      .catch(error => {
        if (this.state.status === 'offline') {
          let cachedCopy = localStorage[`SUBMISSION_${submissionPgid}`] ?
            JSON.parse(localStorage[`SUBMISSION_${submissionPgid}`]) : null;

          if (cachedCopy) {
            // Retrieve from local cache
            cachedCopy = this.organizeQuestionHierarchy(cachedCopy);
            state.isRowClick = true;
            state.endDate = dueDate;
            state.surveySubmission = cachedCopy;
          } else {
            state.surveySubmission = initialState.surveySubmission;
          }
        } else {
          state.loading = false;
          state.isRowClick = false;
          state.surveySubmission = initialState.surveySubmission;
        }

        this.setState(state);
      })

    this.updateSideRowState(submissionPgid);
  };

    createSubmission = (surveyItemData) => {
    const {user,dispatch} = this.props;
    const fcStore = {fc_sfid: this.props.location.state.sfId};
    let state = Object.assign({}, this.state);
    state.loading = true;
    this.setState(state);


    if (!surveyItemData.survey_state) {
      createASubmission(surveyItemData.account_sfid, surveyItemData.survey_sfid,fcStore, user.salt, user.signature, user.uid)
        .then((response) => {

          this.findAllSurveysInAccount(response.store_number);

        })
        .catch(error => {
          console.error(error);
        });
    } else {
     //dispatch(push('/survey', {fcStoreItemData:this.props.location.state.fcStoreItemData, fcName:this.props.location.state.fcName,activeSurveyData:this.props.state.surveysList}));
    }
  };


  updateSideRowState =(submission_pgid) =>{
    let surveysList = this.state.surveysList;
    surveysList = surveysList.map((item) => {
      if (item.submission_pgid === submission_pgid) {
        item.isActive = true;
      } else
        item.isActive = false;

    });
    this.setState({surveysList});
  }

  updateQuestionAnswer = (questionSFID, answerValue, questionType) => {
    let surveySubmission = Object.assign({}, this.state.surveySubmission);
    if(surveySubmission.submission_status === null || surveySubmission.submission_status === "Available" || surveySubmission.submission_status === ""){
      surveySubmission.submission_status = "In Progress"
    }
    let questions = this.traverseQuestions(questionSFID, answerValue, surveySubmission.questions, questionType);
    surveySubmission.questions = questions;
    surveySubmission = this.organizeQuestionHierarchy(surveySubmission);

    this.setState({surveySubmission});
  };

  traverseQuestions = (questionSFID, answerValue, questions, questionType) => {

    questions.forEach(question => {
      if (question.question_sfid === questionSFID) {
        question.answer_text = answerValue;
        if (questionType === QUESTION_TYPE.PRICE)
          question.answer_value = answerValue;

        return;
      }

     //if (question.children != null) {
        if (question.children.length > 0) {
          this.traverseQuestions(questionSFID, answerValue, question.children);
        }
     // }

    });

    return questions;
  };

  /**
   * Method update the survey
   */
  handleSubmit = (surveyComment, questionComments) => {
    const {surveySubmission} = this.state;
    const {user} = this.props;
    // Note we are always maintaining a localStorage cache of the answers in case we lose connectivity which also happened to be flattened
    let cachedSubmission = JSON.parse(localStorage[`SUBMISSION_${surveySubmission.submission_pgid}`]);
    let questions = cachedSubmission.questions
      .map(question => {
        let questionGivenComment = '';
        var foundIndex = questionComments.findIndex(x => x.question_sfid == question.question_sfid);
        if (foundIndex >= 0) {
          questionGivenComment = questionComments[foundIndex].comment;
        }

        return {
          question_sfid: question.question_sfid,
          answerValue: question.answer_value,
          answerText: question.answer_text,
          comment: questionGivenComment
        };
      });

    let payload = {
      storeOperatorComments: surveyComment,
      results: questions
    };

    const setLoading = this.setLoading;
    setLoading(true);

    updateSubmission(user.salt, user.signature, user.uid, surveySubmission.submission_pgid, payload)
      .then(response => {
        this.setState({isRowClick: false, loading: false});
        if (!response.error) {
          // No need to track this anymore in localStorage
          delete localStorage[`SUBMISSION_${surveySubmission.submission_pgid}`];
          alert('Survey submitted successfully');


          //get all surveys for this account
          this.findAllSurveysInAccount(this.props.location.state.fcStoreItemData.store_number);

        } else {
          alert(response.error);
        }

      }).catch(error => {
      setLoading(false);
    })
  };

  render() {
    const {user, location, dispatch} = this.props;
    return (
      <div className="app">
        {user.userRole &&
        <div className="fc_survey fc_survey--block">
          <Sidebar fcStoreItem={this.props.location.state.fcStoreItemData} fcName={this.props.location.state.fcName}
                   sfId={location.state.sfId} surveysListData={this.state.surveysList}
                   dateFormatter={this.convertUTCDateToLocalDate}
                   getSubmission={this.callSubmissionService}></Sidebar>
          <QuestionPanel updateQuestionAnswer={this.updateQuestionAnswer}
                         surveySubmission={this.state.surveySubmission} endDate={this.state.endDate}
                         surveyFill={this.state.isRowClick ? 'fill' : 'empty'}
                         handleSubmit={this.handleSubmit}
      retakeSurvey={this.createSubmission}
                         dispatch={dispatch}
                         sfId={location.state.sfId}
                         networkStatus={this.state.status == 'online' ? true : false}
                         updateQuestionComment={this.updateQuestionComment}
                         questionComments={this.state.questionComments}
          />
        </div>
        }

        {this.state.loading &&
        <Loading />
        }

      </div>
    );
  }
}

function mapStateToProps(state) {
  const {user, routing} = state;
  return {
    user,
    routing
  };
}

export default connect(mapStateToProps)(Survey);