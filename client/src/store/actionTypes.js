// hello world actions
export const HELLO_WORLD = 'HELLO_WORLD';
export const HELLO_WORLD_END = 'HELLO_WORLD_END';
// auth actions
export const INIT_AUTH = 'INIT_AUTH';
export const INIT_AUTH_SUCCESS = 'INIT_AUTH_SUCCESS';
export const DO_LOGIN = 'DO_LOGIN';
export const DO_GITHUB_LOGIN = 'DO_GITHUB_LOGIN';
export const DO_LOGOUT = 'DO_LOGOUT';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const DO_REGISTER = 'DO_REGISTER';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_ERROR = 'REGISTER_ERROR';
// notifications actions
export const ADD_NOTIFICATION = 'ADD_NOTIFICATION';
export const REMOVE_NOTIFICATION = 'REMOVE_NOTIFICATION';
export const REMOVE_NOTIFICATION_BY_REF = 'REMOVE_NOTIFICATION_BY_REF';
// questions actions
export const RESET_QUESTIONS = 'RESET_QUESTIONS';
export const DO_FILTER_QUESTIONS = 'DO_FILTER_QUESTIONS';
export const GET_MORE_QUESTIONS = 'GET_MORE_QUESTIONS';
export const GET_MORE_QUESTIONS_SUCCESS = 'GET_MORE_QUESTIONS_SUCCESS';
export const GET_MORE_QUESTIONS_ERROR = 'GET_MORE_QUESTIONS_ERROR';
export const ANSWER_QUESTION = 'ANSWER_QUESTION';
export const ANSWER_QUESTION_SUCCESS = 'ANSWER_QUESTION_SUCCESS';
export const ANSWER_QUESTION_ERROR = 'ANSWER_QUESTION_ERROR';
export const DELETE_ANSWER = 'DELETE_ANSWER';
export const DELETE_ANSWER_SUCCESS = 'DELETE_ANSWER_SUCCESS';
export const DELETE_ANSWER_ERROR = 'DELETE_ANSWER_ERROR';
export const CREATE_QUESTION = 'CREATE_QUESTION';
export const CREATE_QUESTION_SUCCESS = 'CREATE_QUESTION_SUCCESS';
export const CREATE_QUESTION_ERROR = 'CREATE_QUESTION_ERROR';
export const GET_ANSWERS = 'GET_ANSWERS';
export const GET_ANSWERS_SUCCESS = 'GET_ANSWERS_SUCCESS';
export const GET_ANSWERS_ERROR = 'GET_ANSWERS_ERROR';
// observable actions
export const ADD_OBSERVABLE = 'ADD_OBSERVABLE';
export const REMOVE_OBSERVABLE = 'REMOVE_OBSERVABLE';
// Websocket actions
export const OPEN_WEBSOCKET_CONN = 'OPEN_WEBSOCKET_CONN';
export const CLOSE_WEBSOCKET_CONN = 'CLOSE_WEBSOCKET_CONN';

export const ORDER_BY_DESC = 'ORDER_BY_DESC';
export const ORDER_BY_DESC_SUCCESS = 'ORDER_BY_DESC_SUCCESS';
export const ORDER_BY_DESC_ERROR = 'ORDER_BY_DESC_ERROR';

export const ORDER_BY_ASC = 'ORDER_BY_ASC';
export const ORDER_BY_ASC_SUCCESS = 'ORDER_BY_ASC_SUCCESS';
export const ORDER_BY_ASC_ERROR = 'ORDER_BY_ASC_ERROR';

export const DELETE_QUESTION = 'DELETE_QUESTION';
export const DELETE_QUESTION_SUCCESS = 'DELETE_QUESTION_SUCCESS';
export const DELETE_QUESTION_ERROR = 'DELETE_QUESTION_ERROR';

export const VOTE_QUESTION = 'VOTE_QUESTION';
export const VOTE_QUESTION_SUCCESS = 'VOTE_QUESTION_SUCCESS';
export const VOTE_QUESTION_ERROR = 'VOTE_QUESTION_ERROR';

export const VOTE_ANSWER = 'VOTE_ANSWER';
export const VOTE_ANSWER_SUCCESS = 'VOTE_ANSWER_SUCCESS';
export const VOTE_ANSWER_ERROR = 'VOTE_ANSWER_ERROR';

export const MORE_VOTED_ANSWER = 'MORE_VOTED_ANSWER';
export const MORE_VOTED_ANSWER_SUCCESS = 'MORE_VOTED_ANSWER_SUCCESS';
export const MORE_VOTED_ANSWER_ERROR = 'MORE_VOTED_ANSWER_ERROR';
