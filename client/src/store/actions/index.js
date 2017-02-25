import * as ActionTypes from '../actionTypes';

let nextNotificationId = 0;

export const helloWorldAction = () => ({
  type: ActionTypes.HELLO_WORLD,
});

export const initAuthAction = () => ({
  type: ActionTypes.INIT_AUTH,
});

export const loginAction = payload => ({
  type: ActionTypes.DO_LOGIN,
  payload,
});

export const githubLoginAction = payload => ({
  type: ActionTypes.DO_GITHUB_LOGIN,
  payload,
});

export const logoutAction = () => ({
  type: ActionTypes.DO_LOGOUT,
});

export const registerAction = payload => ({
  type: ActionTypes.DO_REGISTER,
  payload,
});

/**
 * Add a notification to the store.
 * @param {String} text - text to display
 * @param {String} alertType - Bootstrap alert style: success | info | warning | danger
*/
export const addNotificationAction = payload => ({
  type: ActionTypes.ADD_NOTIFICATION,
  payload: {
    id: nextNotificationId++,
    ...payload,
  },
});

export const getNextNotificationId = () => nextNotificationId;


/**
 * Remove a notification from the store.
 * @param {String} notificationId
*/
export const removeNotificationAction = notificationId => ({
  type: ActionTypes.REMOVE_NOTIFICATION,
  payload: {notificationId},
});

export const removeNotificationByRefAction = notificationRef => ({
  type: ActionTypes.REMOVE_NOTIFICATION_BY_REF,
  payload: {notificationRef},
});


export const getMoreQuestions = payload => ({
  type: ActionTypes.GET_MORE_QUESTIONS,
  payload,
});

export const addObservable = observable => ({
  type: ActionTypes.ADD_OBSERVABLE,
  payload: observable,
});

export const removeObservable = payload => ({
  type: ActionTypes.REMOVE_OBSERVABLE,
  payload,
});

export const getAnswers = questionId => ({
  type: ActionTypes.GET_ANSWERS,
  payload: {questionId},
});

export const answerQuestion = payload => ({
  type: ActionTypes.ANSWER_QUESTION,
  payload,
});

export const createQuestion = payload => ({
  type: ActionTypes.CREATE_QUESTION,
  payload,
});

export const getQuestionsAction = payload => ({
  type: ActionTypes.GET_QUESTIONS
});

export const filterQuestionsAction = payload => ({
  type: ActionTypes.FILTER_QUESTIONS,
  payload: payload,
});

export const getUserAction = payload => ({
  type: ActionTypes.GET_USER,
  payload: payload,
});

export const getMyQuestionsAction = payload => ({
  type: ActionTypes.GET_MY_QUESTIONS,
  payload: payload,
});

export const getMyAnswersAction = payload => ({
  type: ActionTypes.GET_MY_ANSWERS,
  payload: payload,
});

export const deleteQuestionAction = payload => ({
  type: ActionTypes.DELETE_QUESTION,
  payload: payload,
});

export const getCreateQuestionAction = payload => ({
  type: ActionTypes.GET_CREATED_QUESTION,
  payload,
});

export const getDeleteQuestionAction = payload => ({
  type: ActionTypes.GET_DELETED_QUESTION,
  payload,
});

export const voteQuestionAction = payload => ({
  type: ActionTypes.VOTE_QUESTION,
  payload,
});

export const orderByDescAction = payload => ({
  type: ActionTypes.ORDER_BY_DESC,
  payload,
});

export const orderByAscAction = payload => ({
  type: ActionTypes.ORDER_BY_ASC,
  payload,
});
