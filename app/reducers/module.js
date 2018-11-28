import { TYPES } from '../actions/module'

const initState = {
  list: [],
  current: null,

  profModules: [],

  error: null
};

export default function moduleReducer(state = initState, action) {
  switch (action.type) {
    case TYPES.MODULE_FIND_SUCCESS:
      return {
        ...state,
        list: action.payload,
        error: null
      }
    case TYPES.MODULE_GET_SUCCESS:
      return {
        ...state,
        current: action.payload,
        error: null
      }
    case TYPES.PROF_MODULES_SUCCESS:
      return {
        ...state,
        profModules: action.payload,
        error: null
      }
    case TYPES.MODULE_ERROR:
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