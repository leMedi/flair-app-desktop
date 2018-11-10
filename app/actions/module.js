import { find as _find, save as _save } from '../models/Module'


export const TYPES = {
  MODULE_FIND: 'MODULE_FIND',
  MODULE_FIND_ERROR: 'MODULE_FIND_ERROR',

  MODULE_SAVE: 'MODULE_SAVE',
  MODULE_SAVE_ERROR: 'MODULE_SAVE_ERROR',

}

export function find(criteria) {
  return (dispatch) => {
    _find(criteria)
    .then(res => (
      dispatch({
        type: TYPES.MODULE_FIND,
        payload: res.docs
      })
    ))
    .catch(err => {
      dispatch({
        type: TYPES.MODULE_FIND_ERROR
      })
    });
  };
}


export function save(module, cb) {
  return (dispatch) => {
    _save(module)
    .then(res => {
      dispatch({
        type: TYPES.MODULE_SAVE,
        payload: res.docs
      })
      return cb(null, res)
    })
    .catch(err => {
      dispatch({
        type: TYPES.MODULE_SAVE_ERROR
      })
      return cb(err)
    });
  };
}