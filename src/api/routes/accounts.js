import express from 'express';

import authenticate from '../middlewares/authentication';
import AccountsResource from '../resources/accounts';
import validate from '../schemas';
import { CreateSchema, LoginSchema, ReadSchema } from '../schemas/accounts';

console.log('CreateSchema: ', CreateSchema)
const router  = express.Router();

router.post(
  '/login', 
  validate.body(LoginSchema),
  (req, res, next) => (
    AccountsResource.login({ body: req.body })
      .then(data => res.json(data))
      .catch(next)
  )
);

router.post(
  '/create',
  validate.body(CreateSchema),
  (req, res, next) => (
    AccountsResource.create({ body: req.body })
      .then(data => res.json(data))
      .catch(next)
  )
);

router.get(
  '/:id', 
  authenticate,
  validate.params(ReadSchema),
  (req, res, next) => (
    AccountsResource.read(req.params.id)
      .then(data => res.json(data))
      .catch(next)
  )
);


module.exports = router;
