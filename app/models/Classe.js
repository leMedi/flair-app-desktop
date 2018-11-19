import db, {store, find as _find, getById as _getById, remove as _remove, bulkStore} from '../database'


export const save = (doc) => (
  store({
    ...doc,
    type: 'classe'
  })
)

export const getById = id => _getById(id)

export const find = (criteria = {}) => (
  _find({
    selector: {
      ...criteria,
      type: 'classe'
    },
  })
)

export const removeClasse = (classe) =>{
  console.log('classe', classe)
  // fetch students in class
  return _find({
    selector: {
      classe: classe._id,
      type: 'etudiant'
    }
  }).then((result) =>{
    // mark students for delete
    const toBeDeleted = result.docs.map(etudiant => Object.assign(etudiant, {_deleted: true}))
    
    // mark class to be deleted too
    toBeDeleted.push(Object.assign(classe, {_deleted: true}))

    console.log('etudiants', toBeDeleted);
    return bulkStore(toBeDeleted) // delete
  })
}