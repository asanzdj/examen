import {Observable} from 'rxjs/Observable';

import * as ActionTypes from '../actionTypes';
import * as Actions from '../actions';
import {signRequest, ajaxErrorToMessage} from '../../util';
import {server as serverConfig} from '../../../config';

const host = serverConfig.host;
const port = serverConfig.port;

export const getUser = action$ => action$
  .ofType(ActionTypes.GET_USER)
  .map(signRequest)
  .mergeMap(({headers, payload}) => Observable
    .ajax.get(`http://${host}:${port}/api/user/${payload.id}`, headers)
    .map(res => res.response)
    .map(user => ({
      type: ActionTypes.GET_USER_SUCCESS,
      payload: {user},
    }))
    .catch(error => Observable.of(
      {
        type: ActionTypes.GET_USER_ERROR,
        payload: {error},
      },
      Actions.addNotificationAction(
        {text: `[get user] Error: ${ajaxErrorToMessage(error)}`, alertType: 'danger'}
      )
    )));
