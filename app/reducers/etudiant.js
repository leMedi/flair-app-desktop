import { TYPES } from '../actions/etudiant'

const initState = {
  list: []
};

export default function etudReducer(state = initState, action) {
  switch (action.type) {
    case TYPES.ETUDIANT_FIND:
      return {
        ...state,
        list: action.payload
      }
    default:
      return state;
  }
}