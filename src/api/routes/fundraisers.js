import express from 'express';

import authenticate from '../middlewares/authentication';
import FundraisersResource from '../resources/fundraisers';
import validate from '../schemas';
import { CreateSchema, ListQuerySchema } from '../schemas/fundraisers';

const router  = express.Router();

router.get(
  '/',
  authenticate,
  validate.body(ListQuerySchema),
  (req, res, next) => (
    FundraisersResource.list({ query: req.query })
      .then(data => res.json(data))
      .catch(next)
  )
);

router.post(
  '/create',
  authenticate,
  (req, res, next) => (
    FundraisersResource.create({ body: req.body })
      .then(data => res.json(data))
      .catch(next)
  )
);

module.exports = router;