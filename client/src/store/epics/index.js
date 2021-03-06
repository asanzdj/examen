import {initAuth, login, githubLogin, register, logout} from './auth';
import {addNotification} from './notifications';
import {addObservable, openConnection, closeConnection} from './realtime';
import {helloWorld} from './helloworld';
import {getMoreQuestions,
        answerQuestion,
        deleteAnswer,
        createQuestion,
        getAnswers,
        doFilterQuestions,
        orderByDesc,
        orderByAsc,
        removePendingQuestionNotifications,
        deleteQuestion,
        voteQuestion,
        voteAnswer,
        moreVotedAnswer} from './questions';

export default [
  // auth
  initAuth,
  login,
  githubLogin,
  register,
  logout,
  addNotification,
  addObservable,
  openConnection,
  closeConnection,
  // hello world
  helloWorld,
  // questions
  getMoreQuestions,
  doFilterQuestions,
  answerQuestion,
  deleteAnswer,
  createQuestion,
  getAnswers,
  removePendingQuestionNotifications,
  orderByDesc,
  orderByAsc,
  deleteQuestion,
  voteQuestion,
  voteAnswer,
  moreVotedAnswer,
];
