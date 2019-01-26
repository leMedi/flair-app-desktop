import Seance from '../models/Seance'

export const TYPES = {
  SEANCE_FIND: '@SEANCE/FIND',
  SEANCE_GET: '@SEANCE/GET_BY_ID',
  SEANCE_SAVE: '@SEANCE/SAVE',
  
  MODULE_SEANCES: '@SEANCE/MODULE_SEANCES',

  SEANCE_FIND_SUCCESS: '@SEANCE/FIND_SUCCESS',
  SEANCE_GET_SUCCESS: '@SEANCE/GET_BY_ID_SUCCESS',
  SEANCE_SAVE_SUCCESS: '@SEANCE/SAVE_SUCCESS',
  
  MODULE_SEANCES_SUCCESS: '@SEANCE/MODULE_SEANCES_SUCCESS',

  SEANCE_ERROR: '@SEANCE/ERROR',
}

export function seanceFind(criteria) {
  return (dispatch) => {
    dispatch({ type: TYPES.SEANCE_FIND })

    Seance.find(criteria)
    .then(seances => {
      dispatch({
        type: TYPES.SEANCE_FIND_SUCCESS,
        payload: seances
      })
      return seances
    })
    .catch(err => {
      dispatch({
        type: TYPES.SEANCE_ERROR,
        payload: err.message
      })
      throw err
    })
  }
}

export function seanceGetById(id) {
  return async (dispatch) => {
    dispatch({ type: TYPES.SEANCE_GET })

    return Seance.getOne(id)
    .then(seance => {
      dispatch({
        type: TYPES.SEANCE_GET_SUCCESS,
        payload: seance.toObject()
      })
      return seance.toObject()
    })
    .catch(err => {
      dispatch({
        type: TYPES.SEANCE_ERROR,
        payload: err.message
      })
      throw err
    })
  }
}

export function seancesFindByModule(moduleId) {
  return (dispatch) => {
    dispatch({ type: TYPES.MODULE_SEANCES })

    Seance.findByModule(moduleId)
    .then(seances => {
      dispatch({
        type: TYPES.MODULE_SEANCES_SUCCESS,
        payload: seances
      })
      return seances
    })
    .catch(err => {
      dispatch({
        type: TYPES.SEANCE_ERROR,
        payload: err.message
      })
      throw err
    })

  }
}


export function seanceSave(doc) {
  return async (dispatch) => {
    dispatch({ type: TYPES.SEANCE_SAVE })

    try {
      const seance = new Seance(doc)
      await seance.save()

      dispatch({
        type: TYPES.SEANCE_SAVE_SUCCESS,
        payload: seance.toObject()
      })

      return seance
    }catch(err){
      dispatch({
        type: TYPES.SEANCE_ERROR,
        payload: err.message
      })
      throw err
    }
  }
}