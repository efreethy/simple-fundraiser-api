
import jwt from 'jsonwebtoken';

import db from '../../db';
import config from '../../config'
import ApiError from '../errors';

const AccountsResource = {};

const TOKEN_SECRET = config.authentication_token_secret;

AccountsResource.login = async ({ body }) => {
  const { username, email, password } = body;
  const account = await db.Account.findByUsernameOrEmail({ username, email });

  if (!account || account.password_hash !== password) {
    throw new ApiError.AuthenticationError()
  }
  
  return { 
    token: jwt.sign({ account_id: account.id }, TOKEN_SECRET),
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

AccountsResource.create = async ({ body }) => {
  const { username, user_type, password, email } = body;
  const account = await db.Account.create({ username, user_type, password_hash: password, email });

  return account.toJSON()
}

export default AccountsResource;