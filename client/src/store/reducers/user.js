import * as ActionTypes from '../actionTypes';

const initialState = {user: {}};

export const questions = (state = initialState, action) => {
  switch (action.type) {
    // all questions logic
    case ActionTypes.GET_USER:
      return {..}

    default:
      return state;
  }
};
