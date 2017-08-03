import React, { Component } from 'react';
import ReactPlayer from 'react-player';
import _ from 'lodash';
import { ModalContainer, ModalDialog } from 'react-modal-dialog';
import { getUserCourseDetail, enrollUserToCourse, updatedUserCourseDetail, completeCourse } from '../../common/services/courses';
import { RadialProgress } from '../Common/RadialProgress';


class CoursesList extends Component {

  state = {
    courseId: '',
    userId: '101517598720547877433',
    courseName: '',
    courseDescription: '',
    pricing: '10',
    url: '',
    isEnrolled: false,
    totalVideos: 0,
    completedVideos: 0,
    playing: false,
    volume: 0.8,
    played: 0,
    loaded: 0,
    duration: 0,
    playbackRate: 1.0,
    videoList: [],
    activeTab: 0,
    voucherCode: '',
    isShowingModal: false,
    status: false
  }

  componentWillMount() {
    const state = Object.assign({}, this.state);
    state.courseId = this.props.location.state.id;
    state.courseName = this.props.location.state.courseName;
    state.courseDescription = this.props.location.state.courseDescription;
    state.pricing = this.props.location.state.pricing;
    this.setState(state);

    this.getDetail();
  }

  onCourseRowClick =(rowData, index) => {
    if (!this.state.playing) {
      this.setState({ url: rowData.video_link, activeTab: index.toString() });
    } else {
      window.alert('Please complete running video first.');
    }
  }

  /**
   * Method use to enroll user to course
   */
  onClickEnrollUserToCourse =(voucherCode) => {
    const payload = {
      user_id: this.state.userId,
      course_id: this.state.courseId,
      total_video: this.state.totalVideos,
    };

    enrollUserToCourse(voucherCode, payload)
      .then((response) => {
        console.log(response);
        if (!response.error) {
          this.setState({ isEnrolled: true, isShowingModal: false });
          // noinspection Eslint
          window.alert('You are successfully enroll for this course, Now you can start your training.');
        } else {
          // noinspection Eslint
          window.alert(response.error);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  onVoucherCodeSubmit =() => {
    this.onClickEnrollUserToCourse(this.state.voucherCode);
  }
  getDetail = () => {
    const courseId = this.props.location.state.id;
    getUserCourseDetail('101517598720547877433', courseId)
      .then((response) => {
        console.log(response);
        if (!response.error) {
          if (response.result !== null && response.result.length > 0) {
            // order by ascending
            const newArr = _.sortBy(response.result, 'id', n => Math.sin(n));

            let isEnrolled = false;
            if (newArr[0].user_id !== null) { isEnrolled = true; }

            const state = Object.assign({}, this.state);
            if (newArr[0].completed_videos !== null && newArr[0].completed_videos > 1) {
              let completedVideo = newArr[0].completed_videos;
              state.activeTab = completedVideo;
              if (completedVideo === newArr.length) { completedVideo -= 1; }
              state.url = newArr[completedVideo].video_link;
            } else {
              state.activeTab = '0';
              state.url = newArr[0].video_link;
            }

            state.videoList = newArr;
            state.isEnrolled = isEnrolled;
            state.totalVideos = newArr[0].total_videos;
            state.status = newArr[0].course_status;
            state.completedVideos = newArr[0].completed_videos;
            this.setState(state);
          }
        } else {
          window.alert(response.error);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleVoucherChange(event) {
    this.setState({ voucherCode: event.target.value });
  }


  calculateCompletedPercentage =(totalVideo, completedVideo) => {
    if (completedVideo === null ? 0 : completedVideo);
    if (totalVideo === null ? 0 : totalVideo);
    const percentage = (completedVideo / totalVideo) * 100;
    return percentage;
  }


  handleClick = () => this.setState({ isShowingModal: true })
  handleClose = () => this.setState({ isShowingModal: false })

  updateCourseVideo = () => {
    const completedVideo = parseInt(this.state.activeTab, 100) + 1;
    const payload = {
      user_id: this.state.userId,
      course_id: this.state.courseId,
      completed_video: completedVideo,
    };
    updatedUserCourseDetail(payload)
      .then((response) => {
        if (!response.error) {
          if (completedVideo === this.state.videoList.length) {
            this.markCaurseAsCompeleted();
          } else {
            const state = Object.assign({}, this.state);
            state.playing = false;
            state.activeTab = completedVideo.toString();
            state.completedVideos = completedVideo.toString();
            state.url = this.state.videoList[completedVideo].video_link;
            this.setState(state);
          }
        } else {
          window.alert(response.error);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  markCaurseAsCompeleted = () => {
    const payload = {
      user_id: this.state.userId,
      course_id: this.state.courseId
    };
    completeCourse(payload)
      .then((response) => {
        if (!response.error) {
          const state = Object.assign({}, this.state);
          state.status = 'completed';
          this.setState(state);
        } else {
          window.alert(response.error);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  /**
   * Method use for render the row for data.
   **/
  renderVideoRow = (rowData, index) => {
    if (rowData.video_link !== null) { return <li className={this.state.activeTab === index.toString() ? 'list-group-item active' : 'list-group-item'} key={index} > <button onClick={() => this.onCourseRowClick(rowData, index)}>{rowData.name}</button></li>; }
    return null;
  };


  render() {
    let percentage = 0;
    if (this.state.status === 'completed') {
      percentage = 100;
    } else {
      percentage = this.calculateCompletedPercentage(this.state.totalVideos, this.state.completedVideos);
    }

    return (
      <div id="page-wrapper">
        <div className="container-fluid">

          <div className="row">
            <div className="col-sm-12">
              <h1 className="page-header">
                {this.state.courseName}
              </h1>
            </div>
          </div>

          <div className="course-container">
            <div className="flex">
              {this.state.isEnrolled &&
              <div className="progress-bar-container">
                <RadialProgress circleStrokeWidth={10} value={percentage} edgeSize={150} radius={64} unit="percent" />
              </div>
              }

              <div className="description-row">
                <div className="row">
                  <div className="col-sm-10">
                    <h3 className="course-container-h3 "> {this.state.courseName}</h3>
                  </div>
                  <div className="col-sm-2">
                    {this.state.isEnrolled ? <h4 className="rightAlign">{this.state.status === 'completed' ? 'COMPLETED' : 'ENROLLED'}</h4> : <h2 className="rightAlign">{this.state.pricing === 0 ? 'FREE' : `$${this.state.pricing}`}</h2>}

                  </div>
                </div>
                <p>{this.state.courseDescription}</p>
                {!this.state.isEnrolled && <button type="button" className="btn btn-sm btn-danger" onClick={this.state.pricing === 0 ? () => this.onClickEnrollUserToCourse('free') : this.handleClick}>ENROLL</button>}
                {this.state.isEnrolled && this.state.status !== 'completed' && <button type="button" className="btn btn-sm btn-danger" onClick={this.markCaurseAsCompeleted}>COMPLETE COURSE</button>}
              </div>
            </div>

          </div>
          {this.state.isEnrolled && this.state.status !== 'completed' && this.state.url !== null && this.state.url.length > 0 && this.state.videoList !== null && this.state.videoList.length > 0 && <div className="course-container">
            <div className="row">
              <div className="col-sm-6">
                <ReactPlayer
                  url={this.state.url}
                  playing={this.state.playing}
                  controls
                  width="100%"
                  height="350px"
                  onPlay={() => this.setState({ playing: true })}
                  onEnded={() => this.updateCourseVideo(this)}
                />
              </div>
              <div className="col-sm-6">
                <div className=" course-video-link-container">
                  <ul className="list-group">
                    {this.state.videoList.map((item, index) => this.renderVideoRow(item, index))
                    }
                  </ul>
                </div>

              </div>
            </div>
          </div>}
        </div>
        {this.state.isShowingModal &&
          <ModalContainer onClose={this.handleClose}>
            <ModalDialog onClose={this.handleClose}>
              <div>
                <div className="container-fluid">

                  <div className="row">
                    <div className="col-sm-12">
                      <h3 className="page-header">
                        Enter Your Voucher Code
                      </h3>
                    </div>
                  </div>
                  <div className="form-group">
                    <input className="form-control" value={this.state.voucherCode} onChange={(e) => { this.handleVoucherChange(e); }} />
                  </div>

                  <button type="submit" className="btn btn-large btn-danger" onClick={this.onVoucherCodeSubmit}>Submit</button>
                </div>
              </div>
            </ModalDialog>
          </ModalContainer>}
      </div>
    );
  }
}

CoursesList.propTypes = {
  location: React.PropTypes.location,
};

export default CoursesList;
