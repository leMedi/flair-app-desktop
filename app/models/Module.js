import {store, find as _find, getById as _getById, remove as _remove} from '../database'
import Model, { Joi } from '../utils/Model'

const Module = Model("module", Joi.object().keys({
  name: Joi.string().min(3).max(30).required(),
 
  hrsCours: Joi.number().integer().min(0).max(300).required(),
  hrsTD: Joi.number().integer().min(0).max(300).required(),
  hrsTP: Joi.number().integer().min(0).max(300).required(),
 
  professeur: Joi.string(),
  classe: Joi.string(),

}));

Module.findByProf = async (profId) => {
  console.log('modules find by prof id', profId)
  
  if(!profId)
    return []
  
  return Module.find({
    professeur: profId
  })
}

export default Module;

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
