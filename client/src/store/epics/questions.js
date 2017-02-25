import {Observable} from 'rxjs/Observable';

import * as ActionTypes from '../actionTypes';
import * as Actions from '../actions';
import {signRequest, ajaxErrorToMessage} from '../../util';
import {server as serverConfig} from '../../../config';

const host = serverConfig.host;
const port = serverConfig.port;

export const getMoreQuestions = action$ => action$
  .ofType(ActionTypes.GET_MORE_QUESTIONS)
  .map(signRequest)
  .mergeMap(({headers, payload}) => Observable
    .ajax.get(`http://${host}:${port}/api/question?skip=${payload.skip || 0}&limit=${payload.limit || 10}`, headers)
    .delayInDebug(2000)
    .map(res => res.response)
    .map(questions => ({
      type: ActionTypes.GET_MORE_QUESTIONS_SUCCESS,
      payload: {questions},
    }))
    .catch(error => Observable.of(
      {
        type: ActionTypes.GET_MORE_QUESTIONS_ERROR,
        payload: {error},
      },
      Actions.addNotificationAction(
        {text: `[get more questions] Error: ${ajaxErrorToMessage(error)}`, alertType: 'danger'},
      ),
    )),
  );

export const getAnswers = action$ => action$
  .ofType(ActionTypes.GET_ANSWERS)
  .map(signRequest)
  .mergeMap(({headers, payload}) => Observable
    .ajax.get(`http://${host}:${port}/api/question/${payload.questionId}`, headers)
    .delayInDebug(2000)
    .map(res => res.response)
    .map(question => ({
      type: ActionTypes.GET_ANSWERS_SUCCESS,
      payload: question,
    }))
    .catch(error => Observable.of(
      {
        type: ActionTypes.GET_ANSWERS_ERROR,
        payload: {error},
      },
      Actions.addNotificationAction(
        {text: `[get answers] Error: ${ajaxErrorToMessage(error)}`, alertType: 'danger'},
      ),
    )),
  );

export const answerQuestion = action$ => action$
  .ofType(ActionTypes.ANSWER_QUESTION)
  .map(signRequest)
  .mergeMap(({headers, payload}) => Observable
    .ajax.post(`http://${host}:${port}/api/question/${payload.question.id}/answer`, {answer: payload.answer}, headers)
    .delayInDebug(2000)
    .map(res => res.response)
    .mergeMap(question => Observable.of(
      {
        type: ActionTypes.ANSWER_QUESTION_SUCCESS,
        payload: question,
      },
      Actions.addNotificationAction(
        {text: `Answer: "${payload.answer}" added to question: "${question.text}"`, alertType: 'info'},
      ),
      Actions.removeNotificationByRefAction(question.id),
    ))
    .catch(error => Observable.of(
      {
        type: ActionTypes.ANSWER_QUESTION_ERROR,
        payload: {error},
      },
      Actions.addNotificationAction(
        {text: `[answer create] Error: ${ajaxErrorToMessage(error)}`, alertType: 'danger'},
      ),
    )),
  );

export const createQuestion = action$ => action$
  .ofType(ActionTypes.CREATE_QUESTION)
  .map(signRequest)
  .switchMap(({headers, payload}) => Observable
    .ajax.post(`http://${host}:${port}/api/question`, payload, headers)
    .map(res => res.response)
    .mergeMap(question => Observable.of(
      {
        type: ActionTypes.CREATE_QUESTION_SUCCESS,
        payload: question,
      },
      Actions.addNotificationAction(
        {text: `Question with text "${question.text}" created`, alertType: 'info'},
      ),
    ))
    .catch(error => Observable.of(
      {
        type: ActionTypes.CREATE_QUESTION_ERROR,
        payload: {error},
      },
      Actions.addNotificationAction(
        {text: `[question create] Error: ${ajaxErrorToMessage(error)}`, alertType: 'danger'},
      ),
    )),
  );

export const removePendingQuestionNotifications = action$ => action$
  .ofType(ActionTypes.REMOVE_OBSERVABLE)
  .filter(action => action.payload && action.payload.question)
  .map(action => action.payload.question)
  .map(question =>
    Actions.removeNotificationByRefAction(question.id),
  );

export const getQuestions = action$ => action$
  .ofType(ActionTypes.GET_QUESTIONS)
  .map(signRequest)
  .switchMap(({headers, payload}) => Observable
    .ajax.get(`http://${host}:${port}/api/questions`, headers)
    .map(res => res.response)
    .mergeMap(questions => Observable.of ({
      type: ActionTypes.GET_QUESTIONS_SUCCESS,
      payload: questions,
    }
    ))
    .catch(error => Observable.of({
      type: ActionTypes.GET_QUESTIONS_ERROR,
      payload: error,
    },
      Actions.addNotificationAction({
        text: `error: ${ajaxErrorToMessage(error)}`, alertType: 'danger',
      })
    )));

export const filterQuestions = action$ => action$
  .ofType(ActionTypes.FILTER_QUESTIONS)
  .map(signRequest)
  .switchMap(({headers, payload}) => Observable
    .ajax.post(`http://${host}:${port}/api/search`, payload, headers)
    .map(res => res.response)
    .mergeMap(questions => Observable.of ({
      type: ActionTypes.FILTER_QUESTIONS_SUCCESS,
      payload: questions,
    }
    ))
    .catch(error => Observable.of({
      type: ActionTypes.FILTER_QUESTIONS_ERROR,
      payload: error,
    },
      Actions.addNotificationAction({
        text: `error: ${ajaxErrorToMessage(error)}`, alertType: 'danger',
      })
    )))
    .throttleTime(500);

export const getMyQuestions = action$ => action$
  .ofType(ActionTypes.GET_MY_QUESTIONS)
  .map(signRequest)
  .switchMap(({headers, payload}) => Observable
    .ajax.get(`http://${host}:${port}/api/getMyQuestions/${payload.id}`, headers)
    .map(res => res.response)
    .mergeMap(questions => Observable.of ({
      type: ActionTypes.GET_MY_QUESTIONS_SUCCESS,
      payload: questions,
    }
    ))
    .catch(error => Observable.of({
      type: ActionTypes.GET_MY_QUESTIONS_ERROR,
      payload: error,
    },
      Actions.addNotificationAction({
        text: `error: ${ajaxErrorToMessage(error)}`, alertType: 'danger',
      })
    )));

export const getMyAnswers = action$ => action$
  .ofType(ActionTypes.GET_MY_ANSWERS)
  .map(signRequest)
  .switchMap(({headers, payload}) => Observable
    .ajax.get(`http://${host}:${port}/api/getMyAnswers/${payload.id}`, headers)
    .map(res => res.response)
    .mergeMap(answers => Observable.of ({
      type: ActionTypes.GET_MY_ANSWERS_SUCCESS,
      payload: answers,
    }
    ))
    .catch(error => Observable.of({
      type: ActionTypes.GET_MY_ANSWERS_ERROR,
      payload: error,
    },
      Actions.addNotificationAction({
        text: `error: ${ajaxErrorToMessage(error)}`, alertType: 'danger',
      })
    )));

export const deleteQuestion = action$ => action$
  .ofType(ActionTypes.DELETE_QUESTION)
  .map(signRequest)
  .switchMap(({headers, payload}) => Observable
    .ajax.delete(`http://${host}:${port}/api/question/${payload.id}`, headers)
    .map(res => res.response)
    .mergeMap(() => Observable.of ({
      type: ActionTypes.DELETE_QUESTION_SUCCESS,
      payload,
    },
      Actions.addNotificationAction({
        text: 'Question deleted', alertType: 'success'
      })
    ))
    .catch(error => Observable.of({
      type: ActionTypes.DELETE_QUESTION_ERROR,
      payload: error,
    },
      Actions.addNotificationAction({
        text: `error: ${ajaxErrorToMessage(error)}`, alertType: 'danger',
      })
    )));

export const getCreateQuestion = action$ => action$
    .ofType(ActionTypes.GET_CREATED_QUESTION)
  .map(signRequest)
  .switchMap(({headers, payload}) => Observable
    .ajax.get(`http://${host}:${port}/api/exercise/${payload.id}`,payload, headers)
    .map(res => res.response)
    .map(question => ({
        type: ActionTypes.GET_CREATED_QUESTION_SUCCESS,
      payload: question,
    }))
    .catch(error => Observable.of({
        type: ActionTypes.GET_CREATED_QUESTION_ERROR,
      payload: error,
    }
    )));

export const voteQuestion = action$ => action$
  .ofType(ActionTypes.VOTE_QUESTION)
  .map(signRequest)
  .switchMap(({headers, payload}) => Observable
    .ajax.post(`http://${host}:${port}/api/question/vote/${payload.id}`, payload, headers)
    .map(res => res.response)
    .mergeMap(question => Observable.of(
      {
        type: ActionTypes.VOTE_QUESTION_SUCCESS,
        payload: question,
      },
      Actions.addNotificationAction(
        {text: `Question with text "${question.text}" voted`, alertType: 'info'},
      ),
    ))
    .catch(error => Observable.of(
      {
        type: ActionTypes.VOTE_QUESTION_ERROR,
        payload: {error},
      },
      Actions.addNotificationAction(
        {text: `[question voted] Error: ${ajaxErrorToMessage(error)}`, alertType: 'danger'}
      )
    )));
