import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';
import { getCompletedCourse } from '../../common/services/courses';


class CompletedCoursesList extends Component {

  state = {
    courseList: []
  }

  componentWillMount() {
    this.getCoursesList();
  }

  getCoursesList = () => {
    const payload = {
      user_id: '101517598720547877433',
    };


    getCompletedCourse(payload)
      .then((response) => {
        if (!response.error) {
          this.setState({ courseList: response.result });
        } else {
          window.alert(response.error);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  goingToCourseDetail = (rowData) => {
    browserHistory.push({ pathname: '/detail', state: { id: rowData.id, courseName: rowData.course_name, courseDescription: rowData.description, pricing: rowData.pricing } });
  };


  /**
   * Method use for render the row for data.
   **/
  renderCourseRow = (rowData, index) => (<div className="course-container" key={index}>
    <div className="row">
      <div className="col-lg-2">
        <img className="img-thumbnail" src={rowData.thumb_image_url} alt="" />
      </div>
      <div className="col-lg-10">
        <h3 className="course-container-h3">{rowData.course_name}</h3>
        <p className="block-with-text">{rowData.description}</p>
        <Link onClick={() => this.goingToCourseDetail(rowData)} className="course-container-a" >VIEW COURSES DETAILS </Link>
      </div>
    </div>
  </div>);


  render() {
    return (
      <div id="page-wrapper">

        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12">
              <h1 className="page-header">
                Completed Courses
              </h1>
            </div>
          </div>

          <div>
            { this.state.courseList.map((item, index) => this.renderCourseRow(item, index))
            }
          </div>


        </div>
      </div>
    );
  }
}

export default CompletedCoursesList;
