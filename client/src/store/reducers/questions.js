import * as ActionTypes from '../actionTypes';

const initialState = {questions: [], status: 'inited', answering: {}, hasMore: true, answer: {}};

export const questions = (state = initialState, action) => {
  switch (action.type) {
    // all questions logic
    case ActionTypes.RESET_QUESTIONS:
      return {questions: [], status: 'loading', hasMore: true, error: null};
    case ActionTypes.GET_MORE_QUESTIONS:
      return {...state, status: 'loading', error: null};
    case ActionTypes.GET_MORE_QUESTIONS_SUCCESS: {
      const hasMore = action.payload.questions.length === 10;
      return {
        ...state,
        questions: action.payload.reset ? action.payload.questions : state.questions.concat(action.payload.questions),
        status: 'done',
        filtered: action.payload.filtered,
        hasMore,
      };
    }
    case ActionTypes.GET_ANSWERS_ERROR:
    case ActionTypes.ANSWER_QUESTION_ERROR:
    case ActionTypes.DELETE_ANSWER_ERROR:
    case ActionTypes.CREATE_QUESTION_ERROR:
    case ActionTypes.DELETE_QUESTION_ERROR:
    case ActionTypes.ORDER_BY_ASC_ERROR:
    case ActionTypes.ORDER_BY_DESC_ERROR:
    case ActionTypes.VOTE_QUESTION_ERROR:
    case ActionTypes.VOTE_ANSWER_ERROR:
    case ActionTypes.MORE_VOTED_ANSWER_ERROR:
      return {
        ...state,
        status: 'error',
        error: action.payload.error,
      };
    case ActionTypes.GET_ANSWERS_SUCCESS:
    case ActionTypes.ANSWER_QUESTION_SUCCESS:
    case ActionTypes.DELETE_ANSWER_SUCCESS: {
      const newQuestions = state.questions.map(q => q.id === action.payload.question.id ? action.payload.question : q);
      return {
        ...state,
        questions: newQuestions,
        status: 'done',
        answering: action.type === ActionTypes.ANSWER_QUESTION_SUCCESS ? {
          ...state.answering,
          [action.payload.question.id]: false,
        } : state.answering,
        deleting: action.type === ActionTypes.DELETE_ANSWER_SUCCESS ? {
          ...state.deleting,
          [action.payload.answerId]: false,
        } : state.deleting,
        hasMore: state.hasMore,
      };
    }
    case ActionTypes.ANSWER_QUESTION: {
      const answering = {...state.answering, [action.payload.question.id]: true};
      return {...state, answering};
    }
    case ActionTypes.DELETE_ANSWER: {
      const deleting = {...state.deleting, [action.payload.answerId]: true};
      return {...state, deleting};
    }
    case ActionTypes.CREATE_QUESTION_SUCCESS: {
      const newQuestions = [action.payload, ...state.questions];
      return {...state, questions: newQuestions, status: 'done', hasMore: state.hasMore};
    }

    case ActionTypes.ORDER_BY_ASC_SUCCESS:
    case ActionTypes.ORDER_BY_DESC_SUCCESS:
      return {questions: action.payload}

      case ActionTypes.DELETE_QUESTION: {
      const deleting = {...state.deleting, [action.payload.id]: true};
      return {...state, deleting};
    };

    case ActionTypes.DELETE_QUESTION_SUCCESS:
       const newQues = state.questions.filter(question => question.id !== action.payload.id);
       return {
         ...state,
         questions: newQues,
         deleting: action.type === ActionTypes.DELETE_ANSWER_SUCCESS ? {
           ...state.deleting,
           [action.payload.id]: false,
         } : state.deleting,
         hasMore: state.hasMore,
       };
       
   case ActionTypes.GET_DELETED_QUESTION:
     const questionsDel = state.questions.filter(question => question.id !== action.payload);
     return {
       ...state,
       questions: questionsDel,
     }

    case ActionTypes.VOTE_QUESTION_SUCCESS:
    case ActionTypes.VOTE_ANSWER_SUCCESS:
     const ques = state.questions.map(ques => ques.id === action.payload.id ? ques = action.payload : ques);
     return {
       ...state,
       questions: ques,
     }

    case ActionTypes.MORE_VOTED_ANSWER_SUCCESS:
      console.log('>>>>>>>>>>>>PAY', action.payload)
      return {
        ...state,
        answer: action.payload[0],
      }

    default:
      return state;
  }
};
