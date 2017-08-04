import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { getCourseNotes, addCourseNotes } from '../../common/services/courses';


export class AddNotes extends React.Component {
  state = {
    isOpenNotes: false,
    courseNote: '',
    userId: '101517598720547877433'
  }

  componentWillMount() {
    this.getCourseNotes();
  }

  componentWillReceiveProps(nextProps) {
    const { isOpenNotes } = nextProps;
    this.setState({ isOpenNotes });
  }

  onNotesSubmit =() => {
    const { closeNotepad } = this.props;
    if (this.state.courseNote.length > 0) {
      const payload = {
        course_id: this.props.courseId,
        user_id: this.state.userId,
        notes: this.state.courseNote
      };
      addCourseNotes(payload)
        .then((response) => {
          if (!response.error) {
            closeNotepad();
          } else {
            window.alert(response.error);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      window.alert('Please insert notes');
    }
  };

  getCourseNotes = () => {
    const payload = {
      user_id: this.state.userId,
      course_id: this.props.courseId
    };
    getCourseNotes(payload)
      .then((response) => {
        if (!response.error) {
          this.setState({ courseNote: response.result.note });
        } else {
          window.alert(response.error);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  handleNotesChange =(event) => {
    this.setState({ courseNote: event.target.value });
  }

  render() {
    return (
      <div className={this.state.isOpenNotes ? 'open-notepad notes-drawer' : 'notes-drawer'} >
        <div className="rightAlign" > <Link className="fa fa-times-circle fa-2x" onClick={this.props.closeNotepad} /></div>
        <div className="row">
          <div className="col-sm-12">
            <h3 className="page-header">
              *Notes
            </h3>
          </div>
        </div>
        <div className="form-group">
          <textarea className="textarea-addnotes" rows="20" value={this.state.courseNote} onChange={(e) => { this.handleNotesChange(e); }} />
        </div>
        <button type="submit" className="btn btn-large btn-danger" onClick={this.onNotesSubmit}>Add Notes</button>

      </div>
    );
  }
}

AddNotes.propTypes = {
  courseId: PropTypes.string, // eslint-disable-line react/forbid-prop-types
  isOpenNotes: PropTypes.boolean, // eslint-disable-line react/forbid-prop-types
  closeNotepad: PropTypes.function, // eslint-disable-line react/forbid-prop-types
};

export default AddNotes;
