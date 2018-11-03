import { find as _find, save as _save } from '../models/Prof'


export const TYPES = {
  PROF_FIND: 'PROF_FIND',
  PROF_FIND_ERROR: 'PROF_FIND_ERROR',

  PROF_SAVE: 'PROF_SAVE',
  PROF_SAVE_ERROR: 'PROF_SAVE_ERROR',

}

export function find(criteria) {
  return (dispatch) => {
    _find(criteria)
    .then(res => (
      dispatch({
        type: TYPES.PROF_FIND,
        payload: res.docs
      })
    ))
    .catch(err => {
      dispatch({
        type: TYPES.PROF_FIND_ERROR
      })
    });
  };
}


export function save(prof, cb) {
  return (dispatch) => {
    _save(prof)
    .then(res => {
      dispatch({
        type: TYPES.PROF_SAVE,
        payload: res.docs
      })
      return cb(null, res)
    })
    .catch(err => {
      dispatch({
        type: TYPES.PROF_SAVE_ERROR
      })
      return cb(err)
    });
  };
}