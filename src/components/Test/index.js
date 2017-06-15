import React from 'react';
import AddStoreModal from '../AddStore';

class SurveyItem extends React.Component {
  render() {
    let survey;
    let surveyFill = this.props.surveyFill;

    if (surveyFill === 'empty') {
      survey = (
        <AddStoreModal></AddStoreModal>
        <div className="fc_survey fc_survey--wrapper">
          <div className="fc_survey--empty">
            <p>cortney Select a survey from the left to start</p>
          </div>
        </div>
      );
    } else {
      survey = (
        <div className="fc_survey fc_survey--wrapper">
          <div className="fc_survey fc_survey--item">
            <div className="fc_survey --block _header">
              <div className="fc_survey --info-block">
                <div className="title title_container">
                  <div className="title title_group survey">
                    <span className="btn btn--back visible-xs"><i className="icon icon--arrow-l"></i></span>
                    <span className="title pre_title hidden-xs">5/6/2017</span>
                    <h2 className="title title_prime">Weekend Survey<span className="flag hidden-xs">Completed by Lewis Page</span>
                    </h2>
                    <span className="sub_title visible-xs">5/6/2017 | Olivia Warren | #32321</span>
                  </div>
                  <div className="fc_survey --edit">
                    <a className="fc_link retake hidden-xs"><i className="icon icon--retake"></i>Retake survey</a>
                    <i className="icon icon--comment"></i>
                  </div>
                </div>
              </div>
              <div className="fc_survey --block _progress">
                <div className="fc_survey --answer-block">
                  <div className="answerBlock all">
                    <span className="total">68</span>
                    <span className="label">all</span>
                  </div>
                  <div className="answerBlock remainder">
                    <span className="total">22</span>
                    <span className="label">unanswered</span>
                  </div>
                </div>
                <div className="fc_survey --filter-block">
                  <p className="hidden-xs">Filter Questions by:</p>

                  <div className="fc_select">
                    <select>
                      <option>Select a category</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            {/* end of fc_survey header */}
            <div className="fc_survey fc_survey--block _inventory">
              <div className="fc_survey --question">
                <div className="questionItem_header">
                  <span className="questionItem_number answered">{/*30*/}</span>
                  <span className="questionItem_subject">Sales floor</span>
                </div>
                <div className="questionItem_survey">
                  <h3 className="questionItem_title">Interior walls and doors are:</h3>
                  <ul className="questionItem_list no-bullet fc_radio">
                    <li>
                      <input type="radio" name="30" id="r1"/>
                      <label htmlFor="r1"><span></span>Free of stains</label>
                    </li>
                    <li>
                      <input type="radio" name="30" id="r2"/>
                      <label htmlFor="r2"><span></span>Free of dirt and dust</label>
                    </li>
                    <li>
                      <input type="radio" name="30" id="r3"/>
                      <label htmlFor="r3"><span></span>All of the above</label>
                    </li>
                  </ul>
                </div>
                <div className="questionItem_footer">
                  <label className="btn camera"><input type="file"/></label>
                  <button className="btn comment">Comment</button>

                  <div className="questionItem_help">
                    <p className="previous"><i className="icon icon--previous"></i>See Previous Answers</p>
                    <i className="icon icon--helper">?</i>
                  </div>
                </div>
              </div>
              {/* end of question 1 */}

              <div className="fc_survey --question">
                <div className="questionItem_header">
                  <span className="questionItem_number">{/*30*/}</span>
                  <span className="questionItem_subject">Sales floor</span>
                </div>
                <div className="questionItem_survey">
                  <h3 className="questionItem_title">Interior walls and doors are:</h3>
                  <ul className="questionItem_list no-bullet fc_radio">
                    <li>
                      <input type="radio" name="30" id="s1"/>
                      <label htmlFor="s1"><span></span>Free of stains</label>
                    </li>
                    <li>
                      <input type="radio" name="30" id="s2"/>
                      <label htmlFor="s2"><span></span>Free of dirt and dust</label>
                    </li>
                    <li>
                      <input type="radio" name="30" id="s3"/>
                      <label htmlFor="s3"><span></span>All of the above</label>
                    </li>
                  </ul>
                </div>
                <div className="questionItem_footer">
                  <label className="btn camera"><input type="file"/></label>
                  <button className="btn comment">Comment</button>

                  <div className="questionItem_help">
                    <p className="previous"><i className="icon icon--previous"></i>See Previous Answers</p>
                    <i className="icon icon--helper">?</i>
                  </div>
                </div>
              </div>
              {/* end of question 2 */}

              <div className="fc_survey --question">
                <div className="questionItem_header">
                  <span className="questionItem_number">{/*30*/}</span>
                  <span className="questionItem_subject">Sales floor</span>
                </div>
                <div className="questionItem_survey">
                  <h3 className="questionItem_title">Provide your assessment of the Glide Racks</h3>
                  <div className="fc_form textarea">
                    <textarea></textarea>
                  </div>
                </div>
                <div className="questionItem_footer">
                  <label className="btn camera"><input type="file"/></label>
                  <button className="btn comment">Comment</button>

                  <div className="questionItem_help">
                    <p className="previous"><i className="icon icon--previous"></i>See Previous Answers</p>
                    <i className="icon icon--helper">?</i>
                  </div>
                </div>
              </div>
              {/* end of question 3 */}

              <div className="fc_survey --question">
                <div className="questionItem_header">
                  <span className="questionItem_number">{/*30*/}</span>
                  <span className="questionItem_subject">Sales floor</span>
                </div>
                <div className="questionItem_survey">
                  <h3 className="questionItem_title">Interior walls and doors are:</h3>
                  <ul className="questionItem_list no-bullet fc_checkbox">
                    <li>
                      <input type="checkbox" name="30" id="c1"/>
                      <label htmlFor="c1"><span></span>Free of stains</label>
                    </li>
                    <li>
                      <input type="checkbox" name="30" id="c2"/>
                      <label htmlFor="c2"><span></span>Free of dirt and dust</label>
                    </li>
                    <li>
                      <input type="checkbox" name="30" id="c3"/>
                      <label htmlFor="c3"><span></span>All of the above</label>
                    </li>
                  </ul>
                </div>
                <div className="questionItem_footer">
                  <label className="btn camera"><input type="file"/></label>
                  <button className="btn comment">Comment</button>

                  <div className="questionItem_help">
                    <p className="previous"><i className="icon icon--previous"></i>See Previous Answers</p>
                    <i className="icon icon--helper">?</i>
                  </div>
                </div>
              </div>
              {/* end of question 4 */}

              <div className="fc_survey --question">
                <div className="questionItem_header">
                  <span className="questionItem_number">{/*30*/}</span>
                  <span className="questionItem_subject">Sales floor</span>
                </div>
                <div className="questionItem_survey">
                  <h3 className="questionItem_title">Merchandise and shelves on gondolas & end caps are clean.
                    Gondolas/end caps fronted and faced.</h3>
                  <ul className="questionItem_list no-bullet fc_radio branch">
                    <li>
                      <input type="radio" name="30" id="d3"/>
                      <label htmlFor="d3"><span></span>Yes</label>
                    </li>
                    <li>
                      <input type="radio" name="30" id="d4"/>
                      <label htmlFor="d4"><span></span>No</label>
                    </li>
                  </ul>
                  <div className="questionItem_branch">
                    <h3 className="questionItem_title">Are the gondolas / end caps up to date with the latest marketing
                      materials?</h3>
                    <ul className="questionItem_list no-bullet fc_radio branch">
                      <li>
                        <input type="radio" name="30" id="e3"/>
                        <label htmlFor="e3"><span></span>Yes</label>
                      </li>
                      <li>
                        <input type="radio" name="30" id="e4"/>
                        <label htmlFor="e4"><span></span>No</label>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="questionItem_footer">
                  <label className="btn camera"><input type="file"/></label>
                  <button className="btn comment">Comment</button>

                  <div className="questionItem_help">
                    <p className="previous"><i className="icon icon--previous"></i>See Previous Answers</p>
                    <i className="icon icon--helper">?</i>
                  </div>
                </div>
              </div>
              {/* end of question 5 */}


              <div className="fc_survey --submission">
                <button className="btn fc_submit">Submit</button>
                <p className="alert --error">Please complete all pending questions before submitting this survey</p>
              </div>
            </div>
            {/*survey inventory questions */}

          </div>
          {/* survey item */}
        </div>
      );
    }
    return (
      <div className="fc_survey fc_survey--questions">
        {survey}
      </div>
    );
  }
}

export default SurveyItem;