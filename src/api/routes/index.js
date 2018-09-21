import db from '../../db';

export const transaction = (routeHandler) => {
  return (req, res, next) => (
    res.json(db.sequelize.transaction(() => routeHandler(req, res, next)))
  )
}