import { getById as _getById  } from '../models/Prof'


export const TYPES = {

  USER_GETBYID: 'USER_GETBYID',
  USER_GETBYID_ERROR: 'USER_GETBYID_ERROR',

}

export function getById(id, cb) {
  return (dispatch) => {
    //clear var
    dispatch({
      type: TYPES.USER_GETBYID,
      payload: null
    })
    return _getById(id)
    .then(res => {
      console.log('before dispatch', res)
      dispatch({
        type: TYPES.USER_GETBYID,
        payload: res
      })
      cb(res)
    })
    .catch(err => {
      console.log(err)
      dispatch({
        type: TYPES.USER_GETBYID_ERROR
      })
    });
  };
}