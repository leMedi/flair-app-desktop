import {store, find as _find, getById as _getById} from '../database'
import Model, { Joi } from '../utils/Model'

const Seance = Model("seance", Joi.object().keys({
  name: Joi.string().min(3).max(30).required(),
  module_id: Joi.string().required(),
  
  description: Joi.string(),
  date: Joi.string().required(),

  tasks: Joi.array().items(Joi.string()),
  assignments: Joi.array().items(Joi.string()),
}));


export default Seance;

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
