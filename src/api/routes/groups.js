import express from 'express';

import authenticate from '../middlewares/authentication';
import GroupsResource from '../resources/groups';
import validate from '../schemas';
import { CreateSchema, ListQuerySchema } from '../schemas/groups';

const router  = express.Router();

router.get(
  '/',
  authenticate,
  validate.body(ListQuerySchema),
  (req, res, next) => (
    GroupsResource.list({ query: req.query })
      .then(data => res.json(data))
      .catch(next)
  )
);

router.post(
  '/create',
  authenticate,
  validate.body(CreateSchema),
  (req, res, next) => (
    GroupsResource.create({ body: req.body })
      .then(data => res.json(data))
      .catch(next)
  )
);

module.exports = router;