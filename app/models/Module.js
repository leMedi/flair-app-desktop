import {store, find as _find, getById as _getById, remove as _remove} from '../database'


export const save = (doc) => (
  store({
    ...doc,
    type: 'module'
  })
)

export const getById = id => _getById(id)

export const find = (criteria = {}) => (
  _find({
    selector: {
      ...criteria,
      type: 'module'
    },
  })
)

export const remove = _remove;
