import express from 'express';

import authenticate from '../middlewares/authentication';
import PrizesResource from '../resources/prizes';
import validate from '../schemas';
import { CreateSchema, ListQuerySchema } from '../schemas/prizes';

const router  = express.Router();

router.get(
  '/',
  authenticate,
  (req, res, next) => (
    PrizesResource.list(req)
      .then(data => res.json(data))
      .catch(next)
  )
);

router.post(
  '/create',
  authenticate,
  (req, res, next) => (
    PrizesResource.create(req)
      .then(data => res.json(data))
      .catch(next)
  )
);

module.exports = router;