import { Request, Response, NextFunction } from 'express';
import expressJwt, { SecretCallbackLong, Options } from 'express-jwt';

import config from '../../config';

const authenticationMiddleware = (): express.RequestHandler => {
  const secretCallback: SecretCallbackLong = (req, payload, done) => {
    done(null, config.authentication_token_secret);
  };

  const options: Options = {
    secret: secretCallback,
    userProperty: 'account'
  };

  return expressJwt(options);
};

export default authenticationMiddleware;