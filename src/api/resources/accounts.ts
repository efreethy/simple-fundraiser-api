import jwt from 'jsonwebtoken';

import config from '../../config';
import db from '../../db';
import ApiError from '../errors';

interface Account {
  id: number;
  username: string;
  email: string;
  passwordHash: string;
}

interface LoginRequestBody {
  username?: string;
  email?: string;
  password: string;
}

interface LoginResponse {
  token: string;
  account: Account;
}

const AccountsResource = {};

const TOKEN_SECRET: string = config.authentication_token_secret;

AccountsResource.login = async ({ body: { username, email, password } }: { body: LoginRequestBody }): Promise<LoginResponse> => {
  const account: Account = await db.Account.findByUsernameOrEmail({ username, email });

  if (!account || account.passwordHash !== password) {
    throw new ApiError.AuthenticationError();
  }
  
  return { 
    token: jwt.sign({ accountId: account.id }, TOKEN_SECRET),
    account: account.toJSON()
  };
};

AccountsResource.read = async (id: number): Promise<Account> => {
  const account: Account = await db.Account.findById(id);

  if (!account) {
    throw new ApiError.ResourceNotFoundError();
  } 
  
  return account.toJSON();
};

AccountsResource.create = async ({ body }: { body: Account }): Promise<Account> => db.Account.create(body);

export default AccountsResource;