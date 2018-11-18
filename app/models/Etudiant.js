import {store, find as _find, getById, bulkStore} from '../database'

const DOC_TYPE = 'etudiant' 

export const save = (doc) => (
  store({
    ...doc,
    type: DOC_TYPE
  })
)

export const bulkSave = (docs, classId, options = {}) => {
  const typedDocs = docs.map(doc => Object.assign(doc, {type: DOC_TYPE, classe: classId}))
  return bulkStore(typedDocs, options)
}

export const get = (id, cb) => (
  getById(id)
  .then (res => cb(null, res))
  .catch(err => cb(err))
)

export const find = (criteria = {}) => (
  _find({
    selector: {
      ...criteria,
      type: DOC_TYPE
    },
  })
)