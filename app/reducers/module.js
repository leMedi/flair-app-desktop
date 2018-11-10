import { TYPES } from '../actions/module'

const initState = {
  list: [],
  modulesProf : [],

};

export default function moduleReducer(state = initState, action) {
  switch (action.type) {
    case TYPES.MODULE_FIND:
      return {
        ...state,
        list: action.payload
      }
    case TYPES.MODULE_GETPROFBYID:
    return {
      ...state,
      modulesProf: action.payload
    }
    default:
      return state;
  }
}