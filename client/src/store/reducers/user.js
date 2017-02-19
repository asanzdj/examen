import * as ActionTypes from '../actionTypes';

const initialState = {user: {}};

export const user = (state = initialState, action) => {
  switch (action.type) {
    // all questions logic
    case ActionTypes.GET_USER_SUCCESS:
      return {
        ...state,
        user: action.payload.user
      };

    case ActionTypes.GET_USER_ERROR:
      return {
        ...state,
        status: 'error',
        error: action.payload.error,
      };

    default:
      return state;
  }
};
