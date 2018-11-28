import Classe from '../models/Classe'

export const TYPES = {
  CLASSE_FIND: '@CLASSE/FIND',
  CLASSE_GET: '@CLASSE/GET_BY_ID',
  CLASSE_SAVE: '@CLASSE/SAVE',
  CLASSE_DELETE: '@CLASSE/DELETE',

  CLASSE_FIND_SUCCESS: '@CLASSE/FIND_SUCCESS',
  CLASSE_GET_SUCCESS: '@CLASSE/GET_BY_ID_SUCCESS',
  CLASSE_SAVE_SUCCESS: '@CLASSE/SAVE_SUCCESS',
  CLASSE_DELETE_SUCCESS: '@CLASSE/DELETE_SUCCESS',

  CLASSE_ERROR: '@CLASSE/ERROR',
}

export function classeFind(criteria) {
  return (dispatch) => {
    dispatch({ type: TYPES.CLASSE_FIND })

    Classe.find(criteria)
    .then(classes => {
      dispatch({
        type: TYPES.CLASSE_FIND_SUCCESS,
        payload: classes
      })
      return classes
    })
    .catch(err => {
      dispatch({
        type: TYPES.CLASSE_ERROR,
        payload: err.message
      })
      throw err
    })

  }
}

export function classeGetById(id) {
  return async (dispatch) => {
    dispatch({ type: TYPES.CLASSE_GET })

    Classe.getOne(id)
    .then(classe => {
      dispatch({
        type: TYPES.CLASSE_GET_SUCCESS,
        payload: classe.toObject()
      })
      return classe
    })
    .catch(err => {
      dispatch({
        type: TYPES.CLASSE_ERROR,
        payload: err.message
      })
      throw err
    })
  }
}


export function classeSave(doc) {
  return async (dispatch) => {
    dispatch({ type: TYPES.CLASSE_SAVE })

    try {
      const classe = new Classe(doc)
      await classe.save()

      dispatch({
        type: TYPES.CLASSE_SAVE_SUCCESS,
        payload: classe.toObject()
      })

      return classe
    }catch(err){
      dispatch({
        type: TYPES.CLASSE_ERROR,
        payload: err.message
      })
      throw err
    }
  }
}

export function classeDelete(id) {
  return async (dispatch) => {
    dispatch({ type: TYPES.CLASSE_DELETE })

    Classe.delete(id)
    .then(classe => {
      dispatch({
        type: TYPES.CLASSE_DELETE_SUCCESS,
      })
      return classe
    })
    .catch(err => {
      dispatch({
        type: TYPES.CLASSE_ERROR,
        payload: err.message
      })
      throw err
    })
  }
}