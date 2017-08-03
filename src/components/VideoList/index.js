import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import ReactPlayer from 'react-player';
import { getVideoList } from '../../common/services/courses';


class VideoList extends Component {

  state = {
    videoList: [],
    playing: false,
  }

  componentWillMount() {
    this.getAllVideoList();
  }

  getAllVideoList = () => {
    getVideoList()
      .then((response) => {
        console.log(response);
        if (!response.error) {
          this.setState({ videoList: response.result });
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
  renderCourseRow = (rowData, index) => (<div key={index} className="gallery_product col-lg-4 col-md-4 col-sm-4 col-xs-6 filter hdpe">
    <div className="gallery_product_container">
      <ReactPlayer
        url={rowData.video_link}
        controls
        width="99%"
        height="200px"
        onPlay={() => this.setState({ playing: true })}
      />

      <span className="gallery-name">{rowData.course_name}</span>
      <br />
      <span className="gallery-title"> {rowData.name}</span>

    </div>

  </div>);


  render() {
    return (
      <div id="page-wrapper">

        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12">
              <h1 className="page-header">
                Course Videos
              </h1>
            </div>
          </div>


          <div className="container">
            <div className="row">
              { this.state.videoList.map((item, index) => this.renderCourseRow(item, index))
              }

            </div>
          </div>


        </div>
      </div>
    );
  }
}

export default VideoList;
