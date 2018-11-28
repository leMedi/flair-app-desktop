import Model, { Joi } from '../utils/Model'

const Module = Model("module", Joi.object().keys({
  name: Joi.string().min(3).max(30).required(),
 
  hrsCours: Joi.number().integer().min(0).max(300).required(),
  hrsTD: Joi.number().integer().min(0).max(300).required(),
  hrsTP: Joi.number().integer().min(0).max(300).required(),
 
  profId: Joi.string(),
  classeId: Joi.string(),

}));

Module.findByProf = async profId => Module.find({ profId })

export default Module;