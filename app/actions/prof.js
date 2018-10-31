import { find as _find } from '../models/Prof'


export const TYPES = {
  PROF_FIND: 'PROF_FIND',
  PROF_FIND_ERROR: 'PROF_FIND_ERROR',
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