import { TYPES } from '../actions/etudiant'

const initState = {
  list: [],

  error: null,
};

export default function etudiantReducer(state = initState, action) {
  switch (action.type) {
    case TYPES.ETUDIANT_FIND_SUCCESS:
      return {
        ...state,
        list: action.payload,
        error: null
      }
    case TYPES.ETUDIANT_ERROR:
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