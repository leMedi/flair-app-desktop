import { find as _find, save as _save } from '../models/Etudiant'


export const TYPES = {
  ETUDIANT_FIND: 'ETUDIANT_FIND',
  ETUDIANT_FIND_ERROR: 'ETUDIANT_FIND_ERROR',

  ETUDIANT_SAVE: 'ETUDIANT_SAVE',
  ETUDIANT_SAVE_ERROR: 'ETUDIANT_SAVE_ERROR',

}

export function find(criteria) {
  return (dispatch) => {
    _find(criteria)
    .then(res => (
      dispatch({
        type: TYPES.ETUDIANT_FIND,
        payload: res.docs
      })
    ))
    .catch(err => {
      dispatch({
        type: TYPES.ETUDIANT_FIND_ERROR
      })
    });
  };
}


export function save(etudiant, cb) {
  return (dispatch) => {
    _save(etudiant)
    .then(res => {
      dispatch({
        type: TYPES.ETUDIANT_SAVE,
        payload: res.docs
      })
      return cb(null, res)
    })
    .catch(err => {
      dispatch({
        type: TYPES.ETUDIANT_SAVE_ERROR
      })
      return cb(err)
    });
  };
}