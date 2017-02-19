import * as ActionTypes from '../actionTypes';

const initialState = {answers: []};

export const answers = (state = initialState, action) => {
  switch (action.type) {
    // all questions logic
    case ActionTypes.GET_MY_ANSWERS_ERROR:
      return {
        ...state,
        status: 'error',
        error: action.payload.error,
      };

    case ActionTypes.GET_MY_ANSWERS_SUCCESS:
      return {
        ...state,
        answers: action.payload
      }

    default:
      return state;
  }
};
