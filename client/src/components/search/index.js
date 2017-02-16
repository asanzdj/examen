import React, {Component} from 'react';
import {connect} from 'react-redux';
import Question from '../question/question';

import {filterQuestionsAction} from '../../store/actions';

const mapStateToProps = (state) => ({
  questions: state.questions.questions,
});

const mapDispatchToProps = dispatch => ({
  filter: payload => dispatch(filterQuestionsAction(payload)),
});

class Search extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const text = e.target.value.trim();
    this.props.filter({text: text});
  }

  render() {
    const {questions} = this.props;
    return (
      <div>
        <input
          type="text"
          className="form-control"
          onChange={this.handleChange}
        />
    </div>
  )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);
