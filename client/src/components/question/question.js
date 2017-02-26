import React, {Component} from 'react';
import Answers from './answers.js';
import AddAnswer from './addAnswer.js';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {deleteQuestionAction, voteQuestionAction} from '../../store/actions';

const mapStateToProps = state => ({
  userAuth: state.auth.user,
  questionV: state.questions.question,
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

  componentWillMount() {
    const {question} = this.props;
  }

  render() {
    let ques;
    const {question, user, userAuth, deleteQuestion,  voteQuestion, questionV} = this.props;
    const {collapse} = this.state;

    //questionV !== undefined  && questionV !== null ? ques = questionV : ques = question;

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
      voteQuestion({id: question.id});
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
             {question.login === userAuth.login ?
               <span>User: me</span>
             :
               <span>User: {question.login}</span>
            }

           </Link>&nbsp;&nbsp;
           {userAuth && ques ?
             question.owner === userAuth.id ?
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
            {question.votes}
         </button>
        </div>
        {collapse ? null : <Answers question={question} userAuth={userAuth} loading />}
        {collapse ? null : <AddAnswer question={question}/>}
      </div>
    );
  }
}
export default connect (mapStateToProps, mapDispatchToProps)(Question);
