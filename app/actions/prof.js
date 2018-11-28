import Prof from '../models/Prof'


export const TYPES = {
  PROF_FIND: '@PROF/FIND',
  PROF_GET: '@PROF/GET_BY_ID',
  PROF_SAVE: '@PROF/SAVE',

  PROF_FIND_SUCCESS: '@PROF/FIND_SUCCESS',
  PROF_GET_SUCCESS: '@PROF/GET_BY_ID_SUCCESS',
  PROF_SAVE_SUCCESS: '@PROF/SAVE_SUCCESS',

  PROF_ERROR: '@PROF/ERROR',
}

export function profFind(criteria) {
  return (dispatch) => {
    dispatch({ type: TYPES.PROF_FIND })

    Prof.find(criteria)
    .then(profs => {
      dispatch({
        type: TYPES.PROF_FIND_SUCCESS,
        payload: profs
      })
      return profs
    })
    .catch(err => {
      dispatch({
        type: TYPES.PROF_ERROR,
        payload: err.message
      })
      throw err
    })

  }
}

export function profGetById(id) {
  return async (dispatch) => {
    dispatch({ type: TYPES.PROF_GET })

    Prof.getOne(id)
    .then(prof => {
      dispatch({
        type: TYPES.PROF_GET_SUCCESS,
        payload: prof.toObject()
      })
      return prof
    })
    .catch(err => {
      dispatch({
        type: TYPES.PROF_ERROR,
        payload: err.message
      })
      throw err
    })
  }
}


export function profSave(doc) {
  return async (dispatch) => {
    dispatch({ type: TYPES.PROF_SAVE })

    try {
      const prof = new Prof(doc)
      await prof.save()

      dispatch({
        type: TYPES.PROF_SAVE_SUCCESS,
        payload: prof.toObject()
      })

      return prof
    }catch(err){
      dispatch({
        type: TYPES.PROF_ERROR,
        payload: err.message
      })
      throw err
    }
  }
}