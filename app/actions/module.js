import { find as _find, save as _save, getById as _getById} from '../models/Module'


export const TYPES = {
  MODULE_FIND: 'MODULE_FIND',
  MODULE_FIND_ERROR: 'MODULE_FIND_ERROR',

  MODULE_SAVE: 'MODULE_SAVE',
  MODULE_SAVE_ERROR: 'MODULE_SAVE_ERROR',

  MODULE_GETPROFBYID: 'MODULE_GETPROFBYID',
  MODULE_GETPROFBYID_ERROR: 'MODULE_GETPROFBYID_ERROR',

  MODULE_GETBYID: 'MODULE_GETBYID',
  MODULE_GETBYID_ERROR: 'MODULE_GETBYID_ERROR',

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

export function getModulesByProf(profid) {
  return (dispatch) => {
    console.log('profid', profid);
    //clear var
    dispatch({
      type: TYPES.MODULE_GETPROFBYID,
      payload: null
    })
    return _find({professeur: profid})
    .then(res => {
      console.log('before dispatch', res)
      dispatch({
        type: TYPES.MODULE_GETPROFBYID,
        payload: res.docs
      })
    })
    .catch(err => {
      console.log(err)
      dispatch({
        type: TYPES.MODULE_GETPROFBYID_ERROR
      })
    });
  };
}

export function getById(id) {
  return (dispatch) => {
    //clear var
    console.log('ModuleId', id);
    dispatch({
      type: TYPES.MODULE_GETBYID,
      payload: null
    })
    return _getById(id)
    .then(res => {
      console.log('before module dispatch', res)
      dispatch({
        type: TYPES.MODULE_GETBYID,
        payload: res
      })
    })
    .catch(err => {
      console.log(err)
      dispatch({
        type: TYPES.MODULE_GETBYID_ERROR
      })
    });
  };
}