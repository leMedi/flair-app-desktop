import Seance, { find as _find, save as _save, getById as _getById} from '../models/Seance'


export const TYPES = {
  SEANCE_FIND: 'SEANCE_FIND',
  SEANCE_FIND_ERROR: 'SEANCE_FIND_ERROR',

  SEANCE_SAVE: 'SEANCE_SAVE',
  SEANCE_SAVE_ERROR: 'SEANCE_SAVE_ERROR',

  SEANCE_GETBYID: 'SEANCE_GETBYID',
  SEANCE_GETBYID_ERROR: 'SEANCE_GETBYID_ERROR',
}

export function find(criteria) {
  return (dispatch) => {
    _find(criteria)
    .then(res => (
      dispatch({
        type: TYPES.SEANCE_FIND,
        payload: res.docs
      })
    ))
    .catch(err => {
      dispatch({
        type: TYPES.SEANCE_FIND_ERROR
      })
    });
  };
}


export function save(seance, cb) {
  return (dispatch) => {
    _save(seance)
    .then(res => {
      dispatch({
        type: TYPES.SEANCE_SAVE,
        payload: res.docs
      })
      return cb(null, res)
    })
    .catch(err => {
      dispatch({
        type: TYPES.SEANCE_SAVE_ERROR
      })
      return cb(err)
    });
  };
}

export function getById(id) {
  return (dispatch) => {
    //clear var
    dispatch({
      type: TYPES.SEANCE_GETBYID,
      payload: null
    })
    return _getById(id)
    .then(res => {
      console.log('before dispatch', res)
      dispatch({
        type: TYPES.SEANCE_GETBYID,
        payload: res
      })
      return res
    })
    .catch(err => {
      console.log(err)
      dispatch({
        type: TYPES.SEANCE_GETBYID_ERROR
      })
    });
  };
}