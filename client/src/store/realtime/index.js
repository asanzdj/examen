import React from 'react';
import {Observable} from 'rxjs/Observable';
import {rethinkdb} from 'rethinkdb-websocket-client';
import _ from 'lodash';

import * as ActionTypes from '../actionTypes';
import * as Actions from '../actions';
import {UpdateQuestionNotification} from '../../components/question';

const r = rethinkdb;

export const registerQuestionObservable = questionId => (conn, getState) =>
  Observable.fromPromise(r.table('Question').filter({id: questionId}).changes().run(conn))
  .switchMap(cursor => Observable.create((observer) => {
    cursor.each((err, row) => {
      if (err) throw err;
      observer.next(row);
    });
    return function() {
      cursor.close();
    };
  }).debounceTime(5000))
  .map(row => Object.assign({},{new: row.new_val}, {old: row.old_val}))
  .map(question => (
    question.new && !question.old ?
      {
        type: ActionTypes.CREATE_QUESTION,
        payload: question.new,
      }
    :
      {
        type: ActionTypes.DELETE_QUESTION,
        payload: question.old.id,
      }
  ))
  .catch(error => Observable.of(
    Actions.addNotificationAction({text: error.toString(), alertType: 'danger'}),
  ));
