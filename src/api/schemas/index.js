
import Joi from 'joi';

const validator = require('express-joi-validation')({ passError: true })

const validate = { 
  params: (inputSchema) => {
      return validator.params(Joi.object(inputSchema(Joi)))
  },
  body: (inputSchema) => {
      return validator.body(Joi.object(inputSchema(Joi)))
  },
  query: (inputSchema) => {
      return validator.query(Joi.object(inputSchema(Joi)))
  },
}

export default validate;
