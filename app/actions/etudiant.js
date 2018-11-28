import Etudiant from '../models/Etudiant'

export const TYPES = {
  ETUDIANT_FIND: '@ETUDIANT/FIND',
  ETUDIANT_SAVE: '@ETUDIANT/SAVE',

  ETUDIANT_FIND_SUCCESS: '@ETUDIANT/FIND_SUCCESS',
  ETUDIANT_SAVE_SUCCESS: '@ETUDIANT/SAVE_SUCCESS',

  ETUDIANT_ERROR: '@ETUDIANT/ERROR',
}

export function etudiantFind(criteria) {
  return (dispatch) => {
    dispatch({ type: TYPES.ETUDIANT_FIND })

    Etudiant.find(criteria)
    .then(etudiants => {
      dispatch({
        type: TYPES.ETUDIANT_FIND_SUCCESS,
        payload: etudiants
      })
      return etudiants
    })
    .catch(err => {
      dispatch({
        type: TYPES.ETUDIANT_ERROR,
        payload: err.message
      })
      throw err
    })

  }
}

export function etudiantSave(doc) {
  return async (dispatch) => {
    dispatch({ type: TYPES.ETUDIANT_SAVE })

    try {
      const etudiant = new Etudiant(doc)
      await etudiant.save()

      dispatch({
        type: TYPES.ETUDIANT_SAVE_SUCCESS,
        payload: etudiant.toObject()
      })

      return etudiant
    }catch(err){
      dispatch({
        type: TYPES.ETUDIANT_ERROR,
        payload: err.message
      })
      throw err
    }
  }
}