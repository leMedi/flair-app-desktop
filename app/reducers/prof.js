import { TYPES } from '../actions/prof'

const initState = {
  list: []
};

export default function profReducer(state = initState, action) {
  switch (action.type) {
    case TYPES.PROF_FIND:
      return {
        ...state,
        list: action.payload
      }
    default:
      return state;
  }
}