import Prof from '../models/Prof'
import Module from '../models/Module'
import Session from '../utils/Session'

export const TYPES = {

  LOGIN: 'LOGIN_XX',
  LOGIN_ERROR: 'ERROR',

  UPDATE_PROF: 'PROF',
  UPDATE_PROF_MODULES: 'MODULES',

  ERROR: '',

}

export function profLogin(email, password, cb) {
  return (dispatch) => {
    // clear var
    console.log('profLogin', email, password);
    dispatch({
      type: TYPES.LOGIN_ERROR,
      payload: null
    })

    return Prof.login(email, password)
      .then(prof => {
        dispatch({
          type: TYPES.UPDATE_PROF,
          payload: prof.toObject()
        })

        console.log('prof login action', email, password, prof)

        // save current user session
        Session.set(Session.keys.AUTH, prof.toObject())
        
        cb(prof)
        
        return prof
      })
      .catch(err => {
        console.log(err)
        dispatch({
          type: TYPES.LOGIN_ERROR,
          payload: err.message
        })
      });
  };
}

export function updateCurrentProf(profId = null) {
  return (dispatch) => {
    
    if(!profId) // if id is null load it from localStorage
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

