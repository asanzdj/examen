import * as ActionTypes from '../actionTypes';

const initialState = {questions: [], question: null,  status: 'inited', answering: {}, hasMore: true};

export const questions = (state = initialState, action) => {
  switch (action.type) {
    // all questions logic
    case ActionTypes.GET_MORE_QUESTIONS:
      return {...state, status: 'loading', error: null};
    case ActionTypes.GET_MORE_QUESTIONS_SUCCESS: {
      const hasMore = action.payload.questions.length === 10;
      return {...state, questions: state.questions.concat(action.payload.questions), status: 'done', hasMore};
    }
    case ActionTypes.GET_ANSWERS_ERROR:
    case ActionTypes.GET_QUESTIONS_ERROR:
    case ActionTypes.ANSWER_QUESTION_ERROR:
    case ActionTypes.CREATE_QUESTIONS_ERROR:
    case ActionTypes.FILTER_QUESTIONS_ERROR:
    case ActionTypes.DELETE_QUESTION_ERROR:
    case ActionTypes.GET_QUESTIONS_ERROR:
    case ActionTypes.VOTE_QUESTION_ERROR:
    case ActionTypes.ORDER_BY_ASC_ERROR:
    case ActionTypes.ORDER_BY_DESC_ERROR:
      return {
        ...state,
        status: 'error',
        error: action.payload.error,
      };
    case ActionTypes.GET_ANSWERS_SUCCESS:
    case ActionTypes.ANSWER_QUESTION_SUCCESS: {
      const newQuestions = state.questions.map(q => q.id === action.payload.id ? action.payload : q);
      return {
        ...state,
        questions: newQuestions,
        status: 'done',
        answering: action.type === ActionTypes.GET_ANSWERS_SUCCESS ? state.answering : {
          ...state.answering,
          [action.payload.id]: false,
        },
        hasMore: state.hasMore,
      };
    }
    case ActionTypes.ANSWER_QUESTION: {
      const answering = {...state.answering, [action.payload.question.id]: true};
      return {...state, answering};
    }
    case ActionTypes.CREATE_QUESTION_SUCCESS: {
      const newQuestions = [action.payload, ...state.questions];
      return {...state, questions: newQuestions, status: 'done', hasMore: state.hasMore};
    }
    case ActionTypes.GET_QUESTIONS_SUCCESS:
      const questions = action.payload;
      return {...questions};

    case ActionTypes.FILTER_QUESTIONS_SUCCESS:
      return {...state, questions: action.payload};

    case ActionTypes.GET_MY_QUESTIONS_SUCCESS:
      return {
        ...state,
        questions: action.payload
      };

    case ActionTypes.DELETE_QUESTION_SUCCESS:
      const filter = state.questions.filter(question => question.id !== action.payload.id);
      return {
        ...state,
        questions: filter
      };

    case ActionTypes.GET_DELETED_QUESTION:
      const questionsDel = state.questions.filter(question => question.id !== action.payload);
      return {
        ...state,
        questions: questionsDel
      }

    case ActionTypes.GET_CREATED_QUESTION:
      const addedQuestion = state.questions.concat(action.payload);
      return {
        ...state,
        questions: addedQuestion
      };

    case ActionTypes.VOTE_QUESTION_SUCCESS:
      return {
        ...state,
        question: action.payload,
      }

      case ActionTypes.ORDER_BY_ASC_SUCCESS:
      case ActionTypes.ORDER_BY_DESC_SUCCESS:
        return {
          ...state,
          questions: action.payload,
        }

    default:
      return state;
  }
};
