
import sqs from 'sequelize-querystring';

import db from '../../db';

const PrizesResource = {};

PrizesResource.list = async ({ query }) => {
  return db.Prize.findAll({
    offset: query.offset || 0,
    limit: query.limit || 10,
    where: query.filter ? sqs.find(query.filter) : {},
    order: query.sort ? sqs.sort(query.sort) : []
  });
}

PrizesResource.create = async ({ body }) => db.Prize.create(body);

export default PrizesResource;