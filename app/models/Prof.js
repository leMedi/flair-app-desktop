import Model, { Joi } from '../utils/Model'

const Prof = Model("prof", Joi.object().keys({
  nom: Joi.string().min(3).max(30).required(),
  prenom: Joi.string().min(3).max(30).required(),

  somme: Joi.string().required(),
  password: Joi.string().min(4).required(),

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