import { TYPES } from '../actions/user';


const initState = {
  currentUser: null,
  modules: [
    {
      path: '/module/NomModule',
      icon: "user",
      name: "NomModule",
    },
  ]
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