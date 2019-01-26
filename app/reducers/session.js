import { TYPES } from '../actions/session';


const initState = {
  currentProf: null,

  loginError: null,

  modules: []
};

export default function sessionReducer(state = initState, action) {
  switch (action.type) {
    case TYPES.PROF:
      return {
        ...state,
        currentProf: action.payload
      }
    case TYPES.PROF_LOGOUT:
      return {
        ...state,
        currentProf: action.payload
      }
    case TYPES.PROF_ERROR:
      return Object.assign({}, initState)
    case TYPES.UPDATE_PROF:
      return {
        ...state,
        currentProf: action.payload
      }
    case TYPES.UPDATE_PROF_MODULES:
      return {
        ...state,
        modules: action.payload.map(
          _module => ({ icon: 'user', path: `/modules/${_module._id}`, name: _module.nom })
        )
      }
    default:
      return state;
  }
}