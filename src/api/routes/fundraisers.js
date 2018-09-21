import express from 'express';

import authenticate from '../middlewares/authentication';
import FundraisersResource from '../resources/fundraisers';
import { transaction } from '../routes';
import validate from '../schemas';
import { CreateSchema, ListQuerySchema } from '../schemas/fundraisers';

const router  = express.Router();

router.get(
  '/',
  authenticate,
  validate.body(ListQuerySchema),
  (req, res, next) => (
    FundraisersResource.list(req)
      .then(data => res.json(data))
      .catch(next)
  )
);

router.post(
  '/create',
  authenticate,
  transaction((req, res, next) =>  
    FundraisersResource.create(req)
  )
);

module.exports = router;