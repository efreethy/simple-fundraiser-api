var models  = require('../models');
var express = require('express');
var debug = require('debug')('express-sequelize');

const Sequelize = require('sequelize');
var router  = express.Router();

const Op = Sequelize.Op;

router.post('/create', async (req, res) => {
  const { username, user_type, password_hash, email } = req.body;

  const account = await models.Account.create({ username, user_type, password_hash, email });

  return res.json(account.toJSON());
});

router.post('/login', async (req, res) => {
  const { username, email, password } = req.body;


  const or = []
  username && or.push({ username })
  email && or.push({ email })
  const account = await models.Account.findOne({ where: { [Op.or]: or } });

  const authenticated = account.password_hash === password;
 
  if (!authenticated) {
    return res.status(400).json({ 'you': 'are a ahacker' });
  }
  
  return res.json(account.toJSON());
});



module.exports = router;
