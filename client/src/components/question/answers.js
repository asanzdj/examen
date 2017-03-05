import React, {Component} from 'react';
import {connect} from 'react-redux';

import {getAnswers, deleteAnswer, addObservable, removeObservable, voteAnswerAction, getMoreVotedAction} from '../../store/actions';
import {registerQuestionObservable} from '../../store/realtime';
import {Spinner} from '../../components/spinner';

const mapStateToProps = (state, {question}) => ({
  answering: state.questions.answering &&
             state.questions.answering[question.id],
  deleting: state.questions.deleting || {},
  user: state.auth.user,
  moreVoted: state.questions.answer,
});

const mapDispatchToProps = dispatch => ({
  getAnswers: questionId => dispatch(getAnswers(questionId)),
  addObservable: observable => dispatch(addObservable(observable)),
  removeObservable: (observable, question) => dispatch(removeObservable({observable, question})),
  deleteAnswer: payload => dispatch(deleteAnswer(payload)),
  voteAnswer: payload => dispatch(voteAnswerAction(payload)),
  getMoreVoted: payload => dispatch(getMoreVotedAction(payload)),
});

class Answers extends Component {
  constructor(props) {
    super(props);
    const {question, getAnswers, addObservable, loading} = this.props;
    getAnswers(question.id);
    const {payload: observable} = addObservable(registerQuestionObservable(question.id));
    this.state = {
      loading,
      observable,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.question !== nextProps.question && nextProps.question.answers) {
      this.setState({loading: false});
    }
  }

  componentWillUnmount() {
    const {removeObservable, question, getMoreVoted} = this.props;
    const {observable} = this.state;
    removeObservable(observable, question);
  }

  componentWillMount() {
    const {getMoreVoted, question} = this.props;
    getMoreVoted({questionId: question.id});
  }

  render() {
    const {question, answering, deleting, user, deleteAnswer, voteAnswer, moreVoted} = this.props;

    const onDeleteAnswerClick = (answerId) => {
      deleteAnswer({
        questionId: question.id,
        answerId,
      });
    };

    const handleVote = (e, id) => {
      e.preventDefault();
      voteAnswer({questionId: question.id, answerId: id})
      return false;
    }

    const {loading} = this.state;
    return (
      <div className="panel-body">
        {loading ? <Spinner /> : (
          <div>
            <ul className="list-group">
              <li className="list-group-item" style={{border: '1px solid green'}}>
                {moreVoted.answer}
              </li>
              {question.answers.map((answer, i) => (
                <li className="list-group-item" key={i} style={{paddingBottom: '20px'}}>
                  {answer.answer}
                  {
                    answer.user && user.id && answer.user === user.id ?
                      !deleting[answer.id] ? <button
                        className="btn btn-sm btn-danger pull-right"
                        onClick={() => onDeleteAnswerClick(answer.id)}
                      >
                        <span className="glyphicon glyphicon-trash action-icon" />
                      </button> : <span className="pull-right"><Spinner /> </span> :
                      null
                  }
                  <button
                    className="btn btn-default glyphicon glyphicon-thumbs-up"
                    onClick={(e) => handleVote(e, answer.id)}>
                 </button>
                 <button className="btn btn-default">
                   {answer.votes}
                </button>
                </li>
              ))}
              {answering ? <li className="list-group-item" key={question.answers.length}><Spinner /></li> : null}
            </ul>
            {!answering && question.answers.length === 0 ? 'No answers yet!' : null}
          </div>
        )}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Answers);
