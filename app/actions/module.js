import Module from '../models/Module'


export const TYPES = {
  MODULE_FIND: '@MODULE/FIND',
  MODULE_GET: '@MODULE/GET_BY_ID',
  MODULE_SAVE: '@MODULE/SAVE',
  
  PROF_MODULES: '@MODULE/PROF_MODULES',

  MODULE_FIND_SUCCESS: '@MODULE/FIND_SUCCESS',
  MODULE_GET_SUCCESS: '@MODULE/GET_BY_ID_SUCCESS',
  MODULE_SAVE_SUCCESS: '@MODULE/SAVE_SUCCESS',
  
  PROF_MODULES_SUCCESS: '@MODULE/PROF_MODULES_SUCCESS',

  MODULE_ERROR: '@MODULE/ERROR',
}

export function moduleFind(criteria) {
  return (dispatch) => {
    dispatch({ type: TYPES.MODULE_FIND })

    Module.find(criteria)
    .then(modules => {
      dispatch({
        type: TYPES.MODULE_FIND_SUCCESS,
        payload: modules
      })
      return modules
    })
    .catch(err => {
      dispatch({
        type: TYPES.MODULE_ERROR,
        payload: err.message
      })
      throw err
    })

  }
}

export function moduleGetById(id) {
  return async (dispatch) => {
    dispatch({ type: TYPES.MODULE_GET })

    Module.getOne(id)
    .then(_module => {
      dispatch({
        type: TYPES.MODULE_GET_SUCCESS,
        payload: _module.toObject()
      })
      return _module
    })
    .catch(err => {
      dispatch({
        type: TYPES.MODULE_ERROR,
        payload: err.message
      })
      throw err
    })
  }
}

export function ModuleFindByProf(profId) {
  return (dispatch) => {
    dispatch({ type: TYPES.PROF_MODULES })

    Module.findByProf(profId)
    .then(modules => {
      dispatch({
        type: TYPES.PROF_MODULES_SUCCESS,
        payload: modules
      })
      return modules
    })
    .catch(err => {
      dispatch({
        type: TYPES.MODULE_ERROR,
        payload: err.message
      })
      throw err
    })

  }
}


export function moduleSave(doc) {
  return async (dispatch) => {
    dispatch({ type: TYPES.MODULE_SAVE })

    try {
      const _module = new Module(doc)
      await _module.save()

      dispatch({
        type: TYPES.MODULE_SAVE_SUCCESS,
        payload: _module.toObject()
      })

      return _module
    }catch(err){
      dispatch({
        type: TYPES.MODULE_ERROR,
        payload: err.message
      })
      throw err
    }
  }
}