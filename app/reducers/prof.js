import { TYPES } from '../actions/prof'

const initState = {
  list: [],
  profCurrent: null
};

export default function profReducer(state = initState, action) {
  switch (action.type) {
    case TYPES.PROF_FIND:
      return {
        ...state,
        list: action.payload
      }
    case TYPES.PROF_GETBYID:
    return {
      ...state,
      profCurrent: action.payload
    }
    default:
      return state;
  }
}