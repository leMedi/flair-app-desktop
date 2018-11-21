import Prof from '../models/Prof'
import Session from '../utils/Session'

export const TYPES = {

  LOGIN: 'USER_LOGIN',
  LOGIN_ERROR: 'USER_LOGIN_ERROR',

}


export function profLogin(email, password) {
  return (dispatch) => {
    dispatch({
      type: TYPES.LOGIN_ERROR,
      payload: null
    })
    
    return Prof.login(email, password)
      .then(prof => {
        dispatch({
          type: TYPES.LOGIN,
          payload: prof.toObject()
        })

        // save current user session
        Session.set(Session.keys.AUTH, prof.toObject())

        return prof
      })
      .catch(err => {
        dispatch({
          type: TYPES.LOGIN_ERROR,
          payload: err.message
        })
      })
  };
}