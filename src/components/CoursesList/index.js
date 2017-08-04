import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';
import { getAvailableCoursesList } from '../../common/services/courses';


class CoursesList extends Component {

  state = {
    courseList: []
  }

  componentWillMount() {
    this.getCoursesList();
  }

  getCoursesList = () => {
    getAvailableCoursesList()
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
  renderCourseRow = (rowData, index) => (<div key={index} className="col-sm-4">

    <Link target="_blank" onClick={() => this.goingToCourseDetail(rowData)}>
      <div className="thecard">
        <div className="card-img">
          <img src={rowData.thumb_image_url} alt="" />
        </div>
        <div className="card-caption">
          <h1>{rowData.course_name}</h1>
          <p className="block-with-text">{rowData.description}</p>
        </div>
        <div className="card-outmore">
          <h5>Read more</h5>
          <i id="outmore-icon" className="fa fa-angle-right" />
        </div>
      </div>
    </Link>
  </div>);


  render() {
    return (
      <div id="page-wrapper">

        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12">
              <h1 className="page-header">
                Courses
              </h1>
            </div>
          </div>

          <div id="mainbox">
            <div className="row">
              { this.state.courseList.map((item, index) => this.renderCourseRow(item, index))
            }
            </div>
          </div>
        </div>
      </div>
    );
  }
}


export default CoursesList;
