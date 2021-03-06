import React, {Component} from 'react';
import {connect} from 'react-redux';

import Question from './question';
import {Spinner} from '../../components/spinner';
import {getMoreQuestions} from '../../store/actions';

const mapStateToProps = state => ({
  hasMore: state.questions.hasMore,
  loadingMore: state.questions.status === 'loading',
  questions: state.questions.questions,
  filtered: state.questions.filtered,
});


const mapDispatchToProps = dispatch => ({
  loadMore: payload => dispatch(getMoreQuestions(payload)),
});

class QuestionSingle extends Component {

  constructor(props) {
    super(props);
    this.state = {
      questionIndex: 0,
    };
  }

  componentDidMount() {
    const {questions, filtered, loadMore} = this.props;
    loadMore({
      skip: questions.length,
      limit: 10,
      match: filtered,
    });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.questions !== nextProps.questions) {
      this.setState({
        questionIndex: 0,
      });
    }
  }

  render() {
    const {questions, filtered, hasMore, loadMore, loadingMore} = this.props;
    const {questionIndex} = this.state;

    const question = questions[questionIndex];

    const handleClick = (inc) => {
      if (hasMore && questionIndex + inc >= questions.length) {
        loadMore({
          skip: questions.length,
          limit: 10,
        });
      }
      this.setState({
        questionIndex: questionIndex + inc,
      });

      return false;
    };

    return (
      <div>
         {!hasMore && questions.length === 0 ? <div>{filtered ? 'No questions match your criteria' : 'No questions yet!'}</div> : null}
         {loadingMore ? <Spinner /> : question ? <Question key={question.id} question={question} /> : questions.length > 0 ? 'No more questions' : null}
         <div className="btn-group col-xs-4 col-xs-offset-5" role="group">
          <button type="button" className="btn btn-default" disabled={questionIndex === 0} onClick={() => handleClick(-1)}>
            <span className="glyphicon glyphicon-arrow-left" />
          </button>
          <button type="button" className="btn btn-default" disabled={loadingMore || (!hasMore && questionIndex >= questions.length)} onClick={() => handleClick(+1)}>
            <span className="glyphicon glyphicon-arrow-right" />
          </button>
         </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuestionSingle);
