import express from 'express';

import db from '../../db';
import authenticate from '../middlewares/authentication';
import PrizeProgramsResource from '../resources/prize_programs';
import { transaction } from '../routes';
import validate from '../schemas';
import { CreateSchema, ListQuerySchema } from '../schemas/prize_programs';

var Promise = require('bluebird');

const router  = express.Router();

router.get(
  '/',
  authenticate,
  validate.body(ListQuerySchema),
  (req, res, next) => (
    PrizeProgramsResource.list(req)
      .then(data => res.json(data))
      .catch(next)
  )
);

router.post(
  '/create',
  authenticate,
  transaction((req, res, next) => PrizeProgramsResource.create(req))
);

module.exports = router;


