import {store, find as _find, getById as _getById, remove as _remove} from '../database'


export const save = (doc) => (
  store({
    ...doc,
    type: 'classe'
  })
)

export const getById = (id) => {
  id = id ? id : '';
  return _getById(id);
  // .then (res => cb(null, res))
  // .catch(err => cb(err))
}

export const find = (criteria = {}) => (
  _find({
    selector: {
      ...criteria,
      type: 'classe'
    },
  })
)

export const remove = _remove;