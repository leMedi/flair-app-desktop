import Model, { Joi } from '../utils/Model'
import Etudiant from './Etudiant'

const Classe = Model('classe', Joi.object().keys({
  filiere: Joi.string().min(3).max(10).required(),
  annee: Joi.number().min(2007).required(),
}));

Classe.delete = (id) => (
  Etudiant.getByClassId(id) // find etudiants in classe
    .then(etudiants => Etudiant.bulkDelete(etudiants)) // delete etudiants
    .then(() => Classe.getOne(id)) // find classe
    .then(classe => classe.delete) // delete classe
)

export default Classe;