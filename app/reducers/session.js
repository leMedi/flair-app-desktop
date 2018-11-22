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
    case TYPES.LOGIN:
      return {
        ...state,
        currentProf: action.payload
      }
    case TYPES.LOGIN_ERROR:
      return {
        ...state,
        loginError: action.payload
      }
    
    case TYPES.UPDATE_PROF:
      return {
        ...state,
        currentProf: action.payload
      }
    case TYPES.UPDATE_PROF_MODULES:
      return {
        ...state,
        modules: action.payload
      }
    default:
      return state;
  }
}