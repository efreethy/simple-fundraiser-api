import express, { Router, Request, Response, NextFunction } from 'express';

import authenticate from '../middlewares/authentication';
import GroupsResource from '../resources/groups';
import { transaction } from '../routes';
import validate from '../schemas';
import { CreateSchema, ListQuerySchema } from '../schemas/groups';

const router: Router = express.Router();

router.get(
  '/',
  authenticate,
  validate.body(ListQuerySchema),
  (req: Request, res: Response, next: NextFunction) => (
    res.json(GroupsResource.list(req))
  )
);

router.post(
  '/create',
  authenticate,
  validate.body(CreateSchema),
  transaction((req: Request, res: Response, next: NextFunction) =>  
    GroupsResource.create(req)
  )
);

export default router;