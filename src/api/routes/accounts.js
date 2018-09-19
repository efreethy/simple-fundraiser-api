import jwt from 'jsonwebtoken';
import express from 'express';

import db from '../../db';
import authenticate from '../middlewares/authentication'
import config from '../../config'
import ApiError from '../errors';

const router  = express.Router();
const TOKEN_SECRET = config.authentication_token_secret;

import { validate, LoginSchema, ReadSchema, CreateSchema } from '../schemas/accounts'


router.post('/create',
  validate.body(CreateSchema),
  async (req, res) => {
    const { username, user_type, password, email } = req.body;

    const account = await db.Account.create({ username, user_type, password_hash: password, email });

    return res.json(account.toJSON());
  }
);

router.post('/login', 
  validate.body(LoginSchema),
  async (req, res) => {
  const { username, email, password } = req.body;

  const account = await db.Account.findByUsernameOrEmail({ username, email });
 
  if (!account.password_hash === password) {
    return res.status(400).json({ 'you': 'are a ahacker' });
  }
  
  return res.json({ 
    token: jwt.sign({ account_id: account.id }, TOKEN_SECRET),
    account: account.toJSON()
  });
});


router.get('/:id', 
  authenticate,
  validate.params(ReadSchema),
  async (req, res, next) => {
    const account = await db.Account.findById(req.params.id);

    if (!account) {
      return next(new ApiError.ResourceNotFoundError())
    } 
    
    return res.json(account.toJSON());
  }
);


module.exports = router;
