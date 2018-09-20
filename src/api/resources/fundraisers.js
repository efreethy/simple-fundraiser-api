
import sqs from 'sequelize-querystring';

import db from '../../db';

const FundraisersResource = {};

FundraisersResource.list = async ({ query }) => {
  return db.Fundraiser.findAll({
    offset: query.offset || 0,
    limit: query.limit || 10,
    where: query.filter ? sqs.find(query.filter) : {},
    order: query.sort ? sqs.sort(query.sort) : [],
    include: [{ model: db.Group, as: 'group' }],
  });
}

FundraisersResource.create = async ({ body }) => (
  db.Fundraiser.create(
    body,
    { include: [{ model: db.Group, as: 'group' }] }
  )
)

export default FundraisersResource;