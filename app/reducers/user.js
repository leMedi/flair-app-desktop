import { TYPES } from '../actions/user';


const initState = {
  currentUser: null,
};

export default function userReducer(state = initState, action) {
  switch (action.type) {
    case TYPES.USER_GETBYID:
    return {
      ...state,
      currentUser: action.payload
    }
    default:
      return state;
  }
}