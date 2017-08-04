import React, { Component } from 'react';
import { getUserNotesList } from '../../common/services/courses';


class Notes extends Component {
  state = {
    notesList: []
  }

  componentWillMount() {
    this.getNotesList();
  }

  getNotesList = () => {
    getUserNotesList('101517598720547877433')
      .then((response) => {
        if (!response.error) {
          if (response.result !== null && response.result.length > 0) {
            this.setState({ notesList: response.result });
          }
        } else {
          window.alert(response.error);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };


  /**
   * Method use for render the row for data.
   **/
  renderNotesRow = (rowData, index) => (
    <div className="col-sm-4" key={index}>
      <div className="quote-container">
        <i className="pin" />
        <blockquote className="note yellow">
          <h1 className="notes-Title">{rowData.course_name}</h1>
          <p className="notes-description">{rowData.note}</p>
        </blockquote>
      </div>
    </div>);
  render() {
    return (
      <div id="page-wrapper">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12">
              <h1 className="page-header">
                Notes
              </h1>
            </div>
          </div>
        </div>
        <div id="mainbox">
          <div className="row">
            { this.state.notesList.map((item, index) => this.renderNotesRow(item, index))
            }
          </div>
        </div>
      </div>
    );
  }
}

export default Notes;
