import React, {Component} from 'react';
import Answers from './answers.js';
import AddAnswer from './addAnswer.js';
import {connect} from 'react-redux';
import {Link} from 'react-router';

import {deleteQuestionAction, getUserAction, voteQuestionAction} from '../../store/actions';

const mapStateToProps = state => ({
  userAuth: state.auth.user,
  user: state.user.user,
  questionV: state.questions.question,
});

const mapDispatchToProps = dispatch => ({
  deleteQuestion: payload => dispatch(deleteQuestionAction(payload)),
  getUser: payload => dispatch(getUserAction(payload)),
  voteQuestion: payload => dispatch(voteQuestionAction(payload)),
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
    let ques;
    const {question, user, userAuth, deleteQuestion, getUser, voteQuestion, questionV} = this.props;
    const {collapse} = this.state;

    questionV !== undefined  && questionV !== null ? ques = questionV : ques = question;

    const handleCollapseClick = (e) => {
      e.preventDefault();
      this.setState({
        collapse: !this.state.collapse,
      });
      return false;
    };

    const handleDelete = e => {
      e.preventDefault();
      deleteQuestion({id: ques.id});
      return false;
    }

    const handleVote = e => {
      e.preventDefault();
      voteQuestion({id: ques.id});
      return false;
    }


    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <span className={`glyphicon glyphicon-${collapse ? 'plus' : 'minus'}`}
            style={{cursor: 'pointer'}}
            onClick={handleCollapseClick} />{' '}
          {ques.text}
           &nbsp;
           <Link to={`/profile/${ques.owner}`}>
             {user.login === userAuth.login ?
               <span>User: me</span>
             :
               <span>User: {user.login}</span>
            }

           </Link>&nbsp;&nbsp;
           {userAuth && ques ?
             ques.owner === userAuth.id ?
               <button
                 className="btn btn-default glyphicon glyphicon-trash btn-danger"
                 onClick={handleDelete}>
               </button>
              : null
           : null}
           <button
             className="btn btn-default glyphicon glyphicon-thumbs-up"
             onClick={handleVote}>
          </button>
          <button className="btn btn-default">
            {ques.votes}
         </button>
        </div>
        {collapse ? null : <Answers question={ques} userAuth={userAuth} loading />}
        {collapse ? null : <AddAnswer question={ques} />}
      </div>
    );
  }
}
export default connect (mapStateToProps, mapDispatchToProps)(Question);
