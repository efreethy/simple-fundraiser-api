import express, { Router, Request, Response, NextFunction } from 'express';

import authenticate from '../middlewares/authentication';
import FundraisersResource from '../resources/fundraisers';
import { transaction } from '../routes';
import validate from '../schemas';
import { CreateSchema, ListQuerySchema } from '../schemas/fundraisers';

const router: Router = express.Router();

router.get(
  '/',
  authenticate,
  validate.body(ListQuerySchema),
  (req: Request, res: Response, next: NextFunction) => (
    FundraisersResource.list(req)
      .then(data => res.json(data))
      .catch(next)
  )
);

router.post(
  '/create',
  authenticate,
  transaction((req: Request, res: Response, next: NextFunction) =>  
    FundraisersResource.create(req)
  )
);

export default router;