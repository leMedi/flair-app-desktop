import Model, { Joi } from '../utils/Model'

const Etudiant = Model('etudiant', Joi.object().keys({
  cne: Joi.string().min(3).max(30).required(),
  classeId: Joi.string().required(),

  nom: Joi.string().min(3).max(30).required(),
  prenom: Joi.string().min(3).max(30).required(),
  
  password: Joi.string().min(3).max(30),
}));

Etudiant.getByClassId = classeId => Etudiant.find({ classeId })

export default Etudiant;
