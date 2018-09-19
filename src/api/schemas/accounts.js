import Joi from 'joi';
const validator = require('express-joi-validation')({ passError: true })

const validate = { 
  params: (inputSchema) => {
      return validator.params(Joi.object(inputSchema(Joi)))
  },
  body: (inputSchema) => {
      return validator.body(Joi.object(inputSchema(Joi)))
  },
}

const CreateSchema = f => ({
  email: f.string(),
  username: f.string(),
  password: f.string().required(),
  user_type: f.string().valid([ 'SPONSOR', 'REPRESENTATIVE' ])
})


const LoginSchema = f => ({
  email: f.string(),
  username: f.string(),
  password: f.string().required(),
})


const ReadSchema = f => ({
  id: f.string().length(16).required()
})


export { validate, LoginSchema, ReadSchema, CreateSchema };

