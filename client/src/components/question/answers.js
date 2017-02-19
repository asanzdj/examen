import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';

import {getAnswers, addObservable, removeObservable} from '../../store/actions';
import {registerQuestionObservable} from '../../store/realtime';
import {Spinner} from '../../components/spinner';

const mapStateToProps = (state, {question}) => ({
  answering: state.questions.answering &&
             state.questions.answering[question.id],
});

const mapDispatchToProps = dispatch => ({
  getAnswers: questionId => dispatch(getAnswers(questionId)),
  addObservable: observable => dispatch(addObservable(observable)),
  removeObservable: (observable, question) => dispatch(removeObservable({observable, question})),
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
    const {removeObservable, question} = this.props;
    const {observable} = this.state;
    removeObservable(observable, question);
  }


  render() {
    const {question, answering, user} = this.props;
    const {loading} = this.state;

    return (
      <div className="panel-body">
        {loading ? <Spinner /> : (
          <div>
            <ul className="list-group">
              {question.answers.map((answer, i) => (
                <li className="list-group-item" key={i}>
                  {answer.answer} &nbsp;
                  <Link to='/profile/{answer.user}'>
                    User: {(answer.login)}
                  </Link>
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
