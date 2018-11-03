import {store, find as _find, getById} from '../database'


export const save = (doc) => (
  store({
    ...doc,
    type: 'prof'
  })
)

export const get = (id, cb) => {
  getById(id)
  .then (res => cb(null, res))
  .catch(err => cb(err))
}

export const find = (criteria = {}) => (
  _find({
    selector: {
      ...criteria,
      type: 'prof'
    },
  })
)