import React, {Component} from 'react';
import {connect} from 'react-redux';
import Question from '../question/question';

import {orderByAscAction} from '../../store/actions';

const style = {
  progress: {
    width: '60%',
  }
};

const mapStateToProps = (state) => ({
  questions: state.questions.questions,
});

const mapDispatchToProps = dispatch => ({
  getVoted: payload => dispatch(orderByAscAction(payload)),
});

class Voted extends Component {

  componentWillMount() {
    this.props.getVoted({order: 'votes', limit: 5});
  }

  render() {
    const {questions} = this.props;
    return (
      <div>
        <ol>
          {questions.map((question, index) =>
            <li key={index}>
              {question.text}
              <div className="progress">
                <div className="progress-bar" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style={style.progress}>
                  60%
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
