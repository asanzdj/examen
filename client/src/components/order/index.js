import React, {Component} from 'react';
import {connect} from 'react-redux';
import Question from '../question/question';

import {orderByDescAction, orderByAscAction} from '../../store/actions';

const mapStateToProps = (state) => ({
  questions: state.questions.questions,
});

const mapDispatchToProps = dispatch => ({
  orderByDesc: payload => dispatch(orderByDescAction(payload)),
  orderByAsc: payload => dispatch(orderByAscAction(payload)),
});

class OrderBy extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    e.preventDefault();
    const {orderByDesc, orderByAsc} = this.props;
    const option = e.target.value.split('.');
    const order = option[0];
    const type = option[1];

    type == 'desc' ? orderByDesc({order}) : orderByAsc({order});
    return false;
  }

  render() {
    const {questions} = this.props;
    return (
      <div className="col-xs-5">
        <select
          className="form-control"
          name="order"
          id="orderBy"
          onChange={this.handleChange}
        >
          <option value="creationDate.desc">Creation Date (Desc)</option>
          <option value="creationDate.asc">Creation Date (Asc)</option>
          <option value="text.desc">Text (Desc)</option>
          <option value="text.asc">Text (Asc)</option>
          <option value="expirationDate.desc">Expiration Date (Desc)</option>
          <option value="expirationDate.asc">Expiration Date (Asc)</option>
          <option value="votes.desc">Votes (Desc)</option>
          <option value="votes.asc">Votes (Asc)</option>
        </select>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderBy);
