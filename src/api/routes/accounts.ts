import express, { Router, Request, Response, NextFunction } from 'express';

import authenticate from '../middlewares/authentication';
import AccountsResource from '../resources/accounts';
import { transaction } from '../routes';
import validate from '../schemas';
import { CreateSchema, LoginSchema, ReadSchema } from '../schemas/accounts';

console.log('CreateSchema: ', CreateSchema)
const router: Router = express.Router();

router.post(
  '/login', 
  validate.body(LoginSchema),
  transaction((req: Request, res: Response, next: NextFunction) =>  
    AccountsResource.login(req)
  )
);

router.post(
  '/create',
  validate.body(CreateSchema),
  transaction((req: Request, res: Response, next: NextFunction) =>  
    AccountsResource.create(req)
  )
);

router.get(
  '/:id', 
  authenticate,
  validate.params(ReadSchema),
  (req: Request, res: Response, next: NextFunction) => (
    res.json(AccountsResource.read(req.params.id))
  )
);


export default router;