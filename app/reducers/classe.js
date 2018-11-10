import { TYPES } from '../actions/classe'

const initState = {
  list: [],
  classeCurrent : null,
};

export default function classeReducer(state = initState, action) {
  switch (action.type) {
    case TYPES.CLASSE_FIND:
      return {
        ...state,
        list: action.payload
      }
    case TYPES.CLASSE_GETBYID:
      return {
        ...state,
        classeCurrent: action.payload
      }
    default:
      return state;
  }
}