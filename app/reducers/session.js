import { TYPES } from '../actions/session';


const initState = {
  currentProf: null,

  loginError: null,

  modules: [
    {
      path: '/module/NomModule',
      icon: "user",
      name: "NomModule",
    },
  ]
};

export default function sessionReducer(state = initState, action) {
  switch (action.type) {
    case TYPES.USER_GETBYID:
      return {
        ...state,
        currentUser: action.payload
      }
    case TYPES.LOGIN:
      return {
        ...state,
        currentUser: action.payload
      }
    case TYPES.LOGIN_ERROR:
      return {
        ...state,
        loginError: action.payload
      }
    default:
      return state;
  }
}