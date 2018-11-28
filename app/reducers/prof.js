import { TYPES } from '../actions/prof'

const initState = {
  list: [],
  current: null,

  error: null
};

export default function profReducer(state = initState, action) {
  switch (action.type) {
    case TYPES.PROF_FIND_SUCCESS:
      return {
        ...state,
        list: action.payload,
        error: null
      }
    case TYPES.PROF_GET_SUCCESS:
      return {
        ...state,
        current: action.payload,
        error: null
      }
    case TYPES.PROF_ERROR:
      return {
        ...state,
        error: action.payload,
      }
    default:
      return {
        ...state,
        error: null
      };
  }
}