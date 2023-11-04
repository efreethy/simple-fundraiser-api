import db from '../../db';
import { Request, Response, NextFunction } from 'express';

export const transaction = (routeHandler: (req: Request, res: Response, next: NextFunction) => void) => {
  return (req: Request, res: Response, next: NextFunction) => (
    res.json(db.sequelize.transaction(() => routeHandler(req, res, next)))
  )
}