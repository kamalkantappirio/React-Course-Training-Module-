import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';
import { getEnrollCoursesList } from '../../common/services/courses';
import { RadialProgress } from '../Common/RadialProgress';


class UserCoursesList extends Component {
  state = {
    courseList: []
  }

  componentWillMount() {
    this.getCoursesList();
  }

  onCourseRowClick = (rowData) => {
    browserHistory.push({ pathname: '/detail',
      state: {
        id: rowData.id,
        courseName: rowData.course_name,
        courseDescription: rowData.description,
        pricing: rowData.pricing
      }
    });
  };

  getCoursesList = () => {
    getEnrollCoursesList('101517598720547877433')
      .then((response) => {
        console.log(response);
        if (!response.error) {
          if (response.result !== null && response.result.length > 0) {
            this.setState({ courseList: response.result });
          }
        } else {
          window.alert(response.error);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  calculateCompletedPercentage = (totalVideo, completedVideo) => {
    if (completedVideo === null ? 0 : completedVideo);
    if (totalVideo === null ? 0 : totalVideo);
    let percentage = (completedVideo / totalVideo) * 100;
    percentage = Math.round(percentage);
    return percentage;
  };

  /**
   * Method use for render the row for data.
   **/
  renderCourseRow = (rowData, index) => {
    let percentage = 0;
    if (rowData.course_status === 'completed') {
      percentage = 100;
    } else {
      percentage = this.calculateCompletedPercentage(rowData.total_videos, rowData.completed_videos);
    }


    return (<div className="course-container" key={index}>
      <Link onClick={() => this.onCourseRowClick(rowData)}>
        <div className="flex">
          <div className="progress-bar-container">
            <RadialProgress circleStrokeWidth={10} value={percentage} edgeSize={150} radius={64} unit="percent" />
          </div>

          <div className="description-row">
            <h3 className="course-container-h3">{rowData.course_name}</h3>
            <p className="block-my-training-with-text">{rowData.description}</p>
            <a className="course-container-a">VIEW COURSES DETAILS</a>
          </div>
        </div>
      </Link>
    </div>);
  };

  render() {
    return (

      <div id="page-wrapper">

        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12">
              <h1 className="page-header">
                My Training
                <small> Enroll Courses</small>
              </h1>

            </div>
          </div>
          { this.state.courseList.map((item, index) => this.renderCourseRow(item, index))
          }
        </div>


      </div>
    );
  }
}

export default UserCoursesList;
