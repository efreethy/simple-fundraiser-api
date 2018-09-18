const models  = require('../db/models');
const express = require('express');
const expressJWT = require('express-jwt');
const Sequelize = require('sequelize');
const jwt = require('jsonwebtoken');
const debug = require('debug')('express-sequelize');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.js')[env];

const router  = express.Router();
const Op = Sequelize.Op;

const authed = expressJWT({
  secret: config.authentication_token_secret,
  userProperty: 'account'
})
const Account = models.Account;

router.post('/create',
  async (req, res) => {
    debug('req.user', req.user)
    const { username, user_type, password_hash, email } = req.body;

    const account = await Account.create({ username, user_type, password_hash, email });

    return res.json(account.toJSON());
  }
);

router.post('/login', async (req, res) => {
  const { username, email, password } = req.body;

  const account = await Account.findByUsernameOrEmail({ username, email });

  const authenticated = account.password_hash === password;
 
  if (!authenticated) {
    return res.status(400).json({ 'you': 'are a ahacker' });
  }
  console.log('config.authentication_secret', config)
  const token = jwt.sign({ account_id: account.id }, config.authentication_token_secret)
  // console.log('token', token)
  
  return res.json({ 
    token,
    account: account.toJSON()
  });
});


router.get('/:id', 
  authed,
  async (req, res) => {
    debug('req.user', req.account)
    console.log('req.user', req.account)
    const { account_id } = req.account;
    console.log('account_id ', account_id)
    const account = await Account.findById(req.params.id);

    return res.json(account.toJSON());
  }
);


module.exports = router;
