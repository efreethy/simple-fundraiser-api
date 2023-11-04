import express, { Router, Request, Response, NextFunction } from 'express';
import db from '../../db';
import authenticate from '../middlewares/authentication';
import PrizeProgramsResource from '../resources/prize_programs';
import { transaction } from '../routes';
import validate from '../schemas';
import { CreateSchema, ListQuerySchema } from '../schemas/prize_programs';

import Promise from 'bluebird';

const router: Router = express.Router();

router.get(
  '/',
  authenticate,
  validate.body(ListQuerySchema),
  (req: Request, res: Response, next: NextFunction) => (
    PrizeProgramsResource.list(req)
      .then(data => res.json(data))
      .catch(next)
  )
);

router.post(
  '/create',
  authenticate,
  transaction((req: Request, res: Response, next: NextFunction) => PrizeProgramsResource.create(req))
);

export default router;