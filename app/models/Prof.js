import {store, find as _find, getById as _getById} from '../database'


export const save = (doc) => (
  store({
    ...doc,
    type: 'prof'
  })
)

export const getById = id => _getById(id)

export const find = (criteria = {}) => (
  _find({
    selector: {
      ...criteria,
      type: 'prof'
    },
  })
)