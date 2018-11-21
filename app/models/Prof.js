import {store, find as _find, getById as _getById} from '../database'
import Model, { Joi } from '../utils/Model'

const Prof = Model("prof", Joi.object().keys({
  firstName: Joi.string().min(3).max(30).required(),
  lastName: Joi.string().min(3).max(30).required(),
  phone: Joi.string(),

  email: Joi.string().email({ minDomainAtoms: 2 }),
  password: Joi.string().min(6).required(),

  role: Joi.string().equal(['prof', 'admin']).default('prof')
}));

Prof.login = async (email, password) => {
  const result = await Prof.find({ email })

  if(result.length === 0)
    throw new Error('email not found')
  
  const prof = result[0]

  if(prof.password === password)
    return new Prof(prof)

  throw new Error('password not correct')
}

export default Prof;

export const save = (doc) => (
  store({
    ...doc,
    type: 'prof'
  })
)

export const getById = id => _getById(id)

export const find = (criteria = {}) => (
  _find({
    selector: {
      ...criteria,
      type: 'prof'
    },
  })
)