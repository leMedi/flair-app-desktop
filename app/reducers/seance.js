import { TYPES } from '../actions/seance'

const initState = {
  list: [], // les seance d'un module
  current: null,

  moduleSeances: [],

  error: null
};

export default function seanceReducer(state = initState, action) {
  switch (action.type) {
    case TYPES.SEANCE_FIND_SUCCESS:
      return {
        ...state,
        list: action.payload,
        error: null
      }
    case TYPES.SEANCE_GET_SUCCESS:
      return {
        ...state,
        current: action.payload,
        error: null
      }
    case TYPES.MODULE_SEANCES_SUCCESS:
      return {
        ...state,
        moduleSeances: action.payload,
        error: null
      }
    case TYPES.SEANCE_ERROR:
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