import { find as _find, save as _save, getById as _getById } from '../models/Classe'


export const TYPES = {
  CLASSE_FIND: 'CLASSE_FIND',
  CLASSE_FIND_ERROR: 'CLASSE_FIND_ERROR',

  CLASSE_SAVE: 'CLASSE_SAVE',
  CLASSE_SAVE_ERROR: 'CLASSE_SAVE_ERROR',

  CLASSE_GETBYID: 'CLASSE_GETBYID',
  CLASSE_GETBYID_ERROR: 'CLASSE_GETBYID_ERROR',

}

export function find(criteria) {
  return (dispatch) => {
    _find(criteria)
    .then(res => (
      dispatch({
        type: TYPES.CLASSE_FIND,
        payload: res.docs
      })
    ))
    .catch(err => {
      dispatch({
        type: TYPES.CLASSE_FIND_ERROR
      })
    });
  };
}


export function save(classe, cb) {
  return (dispatch) => {
    _save(classe)
    .then(res => {
      dispatch({
        type: TYPES.CLASSE_SAVE,
        payload: res.docs
      })
      return cb(null, res)
    })
    .catch(err => {
      dispatch({
        type: TYPES.CLASSE_SAVE_ERROR
      })
      return cb(err)
    });
  };
}

export function getById(id) {
  return (dispatch) => {
    //clear var
    dispatch({
      type: TYPES.CLASSE_GETBYID,
      payload: null
    })
    return _getById(id)
    .then(res => {
      console.log('before dispatch', res)
      dispatch({
        type: TYPES.CLASSE_GETBYID,
        payload: res
      })
    })
    .catch(err => {
      console.log(err)
      dispatch({
        type: TYPES.CLASSE_GETBYID_ERROR
      })
    });
  };
}