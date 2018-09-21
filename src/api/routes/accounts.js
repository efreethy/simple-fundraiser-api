import express from 'express';

import authenticate from '../middlewares/authentication';
import AccountsResource from '../resources/accounts';
import { transaction } from '../routes';
import validate from '../schemas';
import { CreateSchema, LoginSchema, ReadSchema } from '../schemas/accounts';

console.log('CreateSchema: ', CreateSchema)
const router  = express.Router();

router.post(
  '/login', 
  validate.body(LoginSchema),
  transaction((req, res, next) =>  
    AccountsResource.login(req)
  )
);

router.post(
  '/create',
  validate.body(CreateSchema),
  transaction((req, res, next) =>  
    AccountsResource.create(req)
  )
);

router.get(
  '/:id', 
  authenticate,
  validate.params(ReadSchema),
  (req, res, next) => (
    res.json(AccountsResource.read(req.params.id))
  )
);


module.exports = router;
