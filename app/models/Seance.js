import {store, find as _find, getById as _getById} from '../database'


export const save = (doc) => {
  return store({
    ...doc,
    type: 'seance'
  })
}

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
      type: 'seance'
    },
  })
)
