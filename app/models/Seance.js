import {store, find as _find, getById as _getById} from '../database'


export const save = (doc) => (
  store({
    ...doc,
    type: 'seance'
  })
)

export const getById = id => _getById(id)


export const find = (criteria = {}) => (
  _find({
    selector: {
      ...criteria,
      type: 'seance'
    },
  })
)
