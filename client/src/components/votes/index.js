import React, {Component} from 'react';
import {connect} from 'react-redux';
import Question from '../question/question';

import {getQuestionsMoreVotedAction, getQuestionsAction} from '../../store/actions';

const mapStateToProps = (state) => ({
  questions: state.questions.questionsMoreVoted,
  ques: state.questions.questions,
});

const mapDispatchToProps = dispatch => ({
  getVoted: payload => dispatch(getQuestionsMoreVotedAction(payload)),
  getQuestions: () => dispatch(getQuestionsAction()),
});

let totalVotes = 0;
let votePercentaje = 0;

class Voted extends Component {
  constructor(props) {
    super(props);
    this.state = {votes: votePercentaje};
  }

  componentWillMount() {
    const {getVoted, getQuestions} = this.props;
    getVoted({order: 'votes', limit: 5});
    getQuestions();
  }

  render() {
    const {questions, ques} = this.props;
    {ques ?
      ques.map(q => totalVotes += q.votes)
    : null}

    const division = votes => {
      votePercentaje = Math.round(votes/totalVotes * 100);
      return false;
    }

   return (
      <div>
        <ol>
          {questions.map((question, index) =>
            <li key={index}>
              {question.text}
              <div className="progress">
                <div className="progress-bar" role="progressbar" aria-valuenow={`${votePercentaje}`} aria-valuemin="0" aria-valuemax="100" style={{width: `${votePercentaje}%`}}>
                  {division(question.votes)}
                  {votePercentaje} %
                </div>
              </div>
            </li>
          )}
        </ol>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Voted);
