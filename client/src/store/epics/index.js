import {initAuth, login, githubLogin, register, logout} from './auth';
import {addNotification} from './notifications';
import {addObservable, openConnection, closeConnection} from './realtime';
import {helloWorld} from './helloworld';
import {getMoreQuestions,
        answerQuestion,
        createQuestion,
        getAnswers,
        removePendingQuestionNotifications,
        getQuestions,
        filterQuestions,
        getMyQuestions,
        getMyAnswers,
        deleteQuestion,
        voteQuestion} from './questions';
import {getUser} from './user';

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
  answerQuestion,
  createQuestion,
  getAnswers,
  removePendingQuestionNotifications,
  getQuestions,
  filterQuestions,
  getUser,
  getMyQuestions,
  getMyAnswers,
  deleteQuestion,
  voteQuestion,
];
