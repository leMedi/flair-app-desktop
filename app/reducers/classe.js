import { TYPES } from '../actions/classe'

const initState = {
  list: [],
  current: null,

  error: null
};

export default function classeReducer(state = initState, action) {
  switch (action.type) {
    case TYPES.CLASSE_FIND_SUCCESS:
      return {
        ...state,
        list: action.payload,
        error: null
      }
    case TYPES.CLASSE_GET_SUCCESS:
      return {
        ...state,
        current: action.payload,
        error: null
      }
    case TYPES.CLASSE_ERROR:
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