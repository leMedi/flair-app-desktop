import Prof from '../models/Prof'
import Module from '../models/Module'
import Session from '../utils/Session'

export const TYPES = {

  PROF: '@LOGIN/PROF_LOGIN',
  PROF_ERROR: '@LOGIN/PROF_ERROR',

  UPDATE_PROF: '@SESSION/PROF',
  UPDATE_PROF_MODULES: '@SESSION/MODULES',

  ERROR: '@SESSION/ERROR',

}

export function profLogin(email, password) {
  return (dispatch) => {
    dispatch({
      type: TYPES.PROF_ERROR,
      payload: null
    })

    return Prof.login(email, password)
      .then(prof => {
        dispatch({
          type: TYPES.UPDATE_PROF,
          payload: prof.toObject()
        })

        // save current user session
        Session.set(Session.keys.AUTH, prof.toObject())
        
        return prof
      })
      .catch(err => {
        dispatch({
          type: TYPES.PROF_ERROR,
          payload: err.message
        })
      });
  };
}

export function updateCurrentProf(profId = null) {
  return (dispatch) => {
    
    if(!profId) // if id is null load it from localStorage
      // eslint-disable-next-line no-param-reassign
      profId = Session.get(Session.keys.AUTH)._id

    if(!profId) // if still null exit
      return null

    return Prof.getOne(profId)
      .then(prof => {
        dispatch({
          type: TYPES.UPDATE_PROF,
          payload: prof.toObject()
        })

        updateCurrentProfModules(profId)(dispatch);

        // save current user session
        Session.set(Session.keys.AUTH, prof.toObject())

        return prof
      })
      .catch(() => { // connot get prof from db
        // clear session
        Session.set(Session.keys.AUTH, '')
      })
  }
}

export function updateCurrentProfModules(profId) {
  return (dispatch) => (
    Module.findByProf(profId)
      .then(modules => {

        console.log('modules prof action', modules)

        dispatch({
          type: TYPES.UPDATE_PROF_MODULES,
          payload: modules
        })

        return modules
      })
  )
}

