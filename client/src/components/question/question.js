import React, {Component} from 'react';
import Answers from './answers.js';
import AddAnswer from './addAnswer.js';
import {connect} from 'react-redux';
import {Link} from 'react-router';

import {deleteQuestionAction, getUserAction} from '../../store/actions';

const mapStateToProps = state => ({
  userAuth: state.auth.user,
  user: state.user.user,
});

const mapDispatchToProps = dispatch => ({
  deleteQuestion: payload => dispatch(deleteQuestionAction(payload)),
  getUser: payload => dispatch(getUserAction(payload)),
});

class Question extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapse: true,
    };
  }

  componentWillMount() {
    const {getUser, question} = this.props;
    getUser({id: question.owner});
  }

  render() {
    const {question, user, userAuth, deleteQuestion} = this.props;
    const {collapse} = this.state;

    const handleCollapseClick = (e) => {
      e.preventDefault();
      this.setState({
        collapse: !this.state.collapse,
      });
      return false;
    };

    const handleDelete = e => {
      e.preventDefault();
      deleteQuestion({id: question.id});
      return false;
    }

    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <span className={`glyphicon glyphicon-${collapse ? 'plus' : 'minus'}`}
            style={{cursor: 'pointer'}}
            onClick={handleCollapseClick} />{' '}
          {question.text}
           &nbsp;
           <Link to={`/profile/${question.owner}`}>
             User: {user.login}
           </Link>&nbsp;&nbsp;
           {userAuth && question ?
             question.owner === userAuth.id ?
               <button
                 className="btn btn-default glyphicon glyphicon-trash btn-danger"
                 onClick={handleDelete}>
               </button>
              : null
           : null}
        </div>
        {collapse ? null : <Answers question={question} loading />}
        {collapse ? null : <AddAnswer question={question} />}
      </div>
    );
  }
}
export default connect (mapStateToProps, mapDispatchToProps)(Question);
