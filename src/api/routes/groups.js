import express from 'express';

import authenticate from '../middlewares/authentication';
import GroupsResource from '../resources/groups';
import { transaction } from '../routes';
import validate from '../schemas';
import { CreateSchema, ListQuerySchema } from '../schemas/groups';

const router  = express.Router();

router.get(
  '/',
  authenticate,
  validate.body(ListQuerySchema),
  (req, res, next) => (
    res.json(GroupsResource.list(req))
  )
);

router.post(
  '/create',
  authenticate,
  validate.body(CreateSchema),
  transaction((req, res, next) =>  
    GroupsResource.create(req)
  )
);

module.exports = router;