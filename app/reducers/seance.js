import { TYPES } from '../actions/seance'

const initState = {
  list: [],
  currentSeance: null,
};

export default function seanceReducer(state = initState, action) {
  switch (action.type) {
    case TYPES.SEANCE_FIND:
      return {
        ...state,
        list: action.payload
      }
      case TYPES.SEANCE_GETBYID:
      return {
        ...state,
        currentSeance : action.payload
      }
    default:
      return state;
  }
}