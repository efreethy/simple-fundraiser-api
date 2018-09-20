
import jwt from 'jsonwebtoken';

import config from '../../config';
import db from '../../db';
import ApiError from '../errors';

const AccountsResource = {};

const TOKEN_SECRET = config.authentication_token_secret;

AccountsResource.login = async ({ body: { username, email, password } }) => {
  const account = await db.Account.findByUsernameOrEmail({ username, email });

  if (!account || account.passwordHash !== password) {
    throw new ApiError.AuthenticationError()
  }
  
  return { 
    token: jwt.sign({ accountId: account.id }, TOKEN_SECRET),
    account: account.toJSON()
  }
}

AccountsResource.read = async (id) => {
  const account = await db.Account.findById(id);

  if (!account) {
    throw new ApiError.ResourceNotFoundError()
  } 
  
  return account.toJSON();
}

AccountsResource.create = async ({ body }) => db.Account.create(body);

export default AccountsResource;