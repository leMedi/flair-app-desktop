import {store, find as _find, getById, remove as _remove} from '../database'


export const save = (doc) => {
  console.log('doc', doc);
  
  return store({
    ...doc,
    type: 'module'
  })
}

export const get = (id, cb) => {
  getById(id)
  .then (res => cb(null, res))
  .catch(err => cb(err))
}

export const find = (criteria = {}) => (
  _find({
    selector: {
      ...criteria,
      type: 'module'
    },
  })
)

export const remove = _remove;