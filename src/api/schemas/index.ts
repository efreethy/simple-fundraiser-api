import Joi, { ObjectSchema } from 'joi';
import { RequestHandler } from 'express';

const validator = require('express-joi-validation')({ passError: true });

interface InputSchema {
  (joi: typeof Joi): ObjectSchema;
}

interface Validate {
  params: (inputSchema: InputSchema) => RequestHandler;
  body: (inputSchema: InputSchema) => RequestHandler;
  query: (inputSchema: InputSchema) => RequestHandler;
}

const validate: Validate = {
  params: (inputSchema) => {
    return validator.params(Joi.object(inputSchema(Joi)));
  },
  body: (inputSchema) => {
    return validator.body(Joi.object(inputSchema(Joi)));
  },
  query: (inputSchema) => {
    return validator.query(Joi.object(inputSchema(Joi)));
  },
};

export default validate;