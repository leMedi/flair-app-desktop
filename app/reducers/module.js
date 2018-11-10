import { TYPES } from '../actions/module'

const initState = {
  list: []
};

export default function moduleReducer(state = initState, action) {
  switch (action.type) {
    case TYPES.MODULE_FIND:
      return {
        ...state,
        list: action.payload
      }
    default:
      return state;
  }
}