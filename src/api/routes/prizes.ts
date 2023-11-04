import express, { Router, Request, Response, NextFunction } from 'express';

import authenticate from '../middlewares/authentication';
import PrizesResource from '../resources/prizes';
import validate from '../schemas';
import { CreateSchema, ListQuerySchema } from '../schemas/prizes';

const router: Router = express.Router();

router.get(
  '/',
  authenticate,
  (req: Request, res: Response, next: NextFunction): void => {
    PrizesResource.list(req)
      .then((data: any): void => res.json(data))
      .catch(next);
  }
);

router.post(
  '/create',
  authenticate,
  (req: Request, res: Response, next: NextFunction): void => {
    PrizesResource.create(req)
      .then((data: any): void => res.json(data))
      .catch(next);
  }
);

export default router;