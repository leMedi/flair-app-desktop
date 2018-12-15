import Model, { Joi } from '../utils/Model'

const Module = Model("module", Joi.object().keys({
  nom: Joi.string().max(30).required(),
 
  chargeHoraire: Joi.object({
    cours: Joi.number().integer().min(0).max(300).required(),
    td: Joi.number().integer().min(0).max(300).required(),
    tp: Joi.number().integer().min(0).max(300).required(),
  }),
 
  profId: Joi.string(),
  classeId: Joi.string(),
}));

Module.findByProf = async profId => Module.find({ profId })

export default Module;