// our packages
import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';

import {getUserAction, getMyQuestionsAction, /*getMyAswersAction*/} from '../../store/actions';

const mapStateToProps = (state) => ({
   userAuth: state.auth.user,
   user: state.user.user,
   myQuestions: state.questions.questions,
   //myAnswers: state.answers.answers,
 });

 const mapDispatchToProps = (dispatch) => ({
   getUser:  payload => dispatch(getUserAction(payload)),
   getMyQuestions: payload => dispatch(getMyQuestionsAction(payload)),
   //getMyAnswers: payload => dispatch(getMyAswersAction(payload)),
 });

class user extends React.Component {
  constructor(props){
    super(props);
  }

  componentWillMount(){
    const {userAuth, getUser} = this.props;
    this.props.getUser({id: userAuth.id});
    this.props.getMyQuestions({id: userAuth.id});
  }

  render(){
    const {user, userAuth, myQuestions} = this.props;
    return (
      <div>
        <h1>My profile</h1>
          <p>Login: &nbsp; {user.login}</p>
          <p>Id: &nbsp; {user.id}</p>
          {user ?
            user.registrationDate ?
              <p>Registration date: &nbsp; {user.registrationDate.substr(0, 10)}</p>
            : null
          : null}
          <p>Number of questions: &nbsp; {myQuestions.length}</p>
      </div>
      )
  }
 };

export default connect(mapStateToProps, mapDispatchToProps)(user);
