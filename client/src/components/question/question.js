import React, {Component} from 'react';

import Answers from './answers.js';
import AddAnswer from './addAnswer.js';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {Spinner} from '../../components/spinner';
import {deleteQuestionAction, getUserAction, voteQuestionAction} from '../../store/actions';

const mapStateToProps = state => ({
  userAuth: state.auth.user,
  deleting: state.questions.deleting || {},
});

const mapDispatchToProps = dispatch => ({
  deleteQuestion: payload => dispatch(deleteQuestionAction(payload)),
  voteQuestion: payload => dispatch(voteQuestionAction(payload)),
});

class Question extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapse: true,
    };
  }

  render() {
    const {question, userAuth, deleteQuestion, user, deleting, voteQuestion} = this.props;
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

    const handleVote = e => {
      e.preventDefault();
      voteQuestion({id: question.id})
      return false;
    }

    console.log('>>>DEL', deleting)

    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <span className={`glyphicon glyphicon-${collapse ? 'plus' : 'minus'}`}
            style={{cursor: 'pointer'}}
            onClick={handleCollapseClick} />{' '}
          {question.text}
          &nbsp;
           <Link to={`/profile/${question.owner}`}>
             {question.login === userAuth.login ?
               <span>User: me</span>
             :
               <span>User: {question.login}</span>
            }
          </Link>&nbsp;&nbsp;
          {question.owner === userAuth.id ?
            !deleting[question.id] ?
              <button
                className="btn btn-sm btn-danger pull-right"
                onClick={(e) => handleDelete(e, question.id)}
              >
                <span className="glyphicon glyphicon-trash action-icon" />
              </button>
            :
              <span className="pull-right"><Spinner /> </span>
          :
              null
          }
          <button
            className="btn btn-default glyphicon glyphicon-thumbs-up"
            onClick={handleVote}>
         </button>
         <button className="btn btn-default">
           {question.votes}
        </button>
        </div>
        {collapse ? null : <Answers question={question} userAuth={userAuth} loading />}
        {collapse ? null : <AddAnswer question={question} />}
      </div>
    );
  }
}
export default connect (mapStateToProps, mapDispatchToProps)(Question);
