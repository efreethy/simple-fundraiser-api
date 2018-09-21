import express from 'express';
var Promise = require('bluebird');

import db from '../../db';
import authenticate from '../middlewares/authentication';
import PrizeProgramsResource from '../resources/prize_programs';
import validate from '../schemas';
import { CreateSchema, ListQuerySchema } from '../schemas/prize_programs';
import { transaction } from '../routes'
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


