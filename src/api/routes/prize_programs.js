import express from 'express';

import authenticate from '../middlewares/authentication';
import PrizeProgramsResource from '../resources/prize_programs';
import validate from '../schemas';
import { CreateSchema, ListQuerySchema } from '../schemas/prize_programs';

import db from '../../db';

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
  (req, res, next) => (
    db.sequelize.transaction(t => (
      PrizeProgramsResource.create(req, t)
    ))
    .then(data => res.json(data))
    .catch(next)
  ),
);

module.exports = router;

// return sequelize.transaction().then(function (t) {
//   return User.create({
//     firstName: 'Bart',
//     lastName: 'Simpson'
//   }, {transaction: t}).then(function (user) {
//     return user.addSibling({
//       firstName: 'Lisa',
//       lastName: 'Simpson'
//     }, {transaction: t});
//   }).then(function () {
//     return t.commit();
//   }).catch(function (err) {
//     return t.rollback();
//   });
// });