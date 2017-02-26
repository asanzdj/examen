import React, {Component} from 'react';
import {connect} from 'react-redux';
import moment from 'moment';

import {answerQuestion} from '../../store/actions';

const mapDispatchToProps = dispatch => ({
  doAnswer: payload => dispatch(answerQuestion(payload)),
});

class AddAnswer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let answerInput;
    const {question, doAnswer} = this.props;

    const handleAnswerClick = (e) => {
      e.preventDefault();
      doAnswer({question, answer: answerInput.value});
      answerInput.value = '';
      return false;
    };

    const today = moment().format('YYYY-MM-DD');
    const date = question.expirationDate.substring(0, 10);

    console.log('>>>DAte', date)
    console.log('>>>DAte', today)

    return (
      <div className="panel-footer">
        {date.localeCompare(today) === 1 ?
        <form className="form-horizontal">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              id="answerInput"
              placeholder="Enter your answer..."
              ref={(i) => { answerInput = i; }}
            />
            <span className="input-group-btn">
              <button type="submit" className="btn btn-default" onClick={handleAnswerClick}>
                Answer
              </button>
            </span>
          </div>
        </form>
        :
        <p>Adding answers is closed</p>}
      </div>
    );
  }
}

export default connect(null, mapDispatchToProps)(AddAnswer);
