
import sqs from 'sequelize-querystring';

import db from '../../db';

const GroupsResource = {};

GroupsResource.list = async ({ query }) => {
  return db.Group.findAll({
    offset: query.offset || 0,
    limit: query.limit || 10,
    where: query.filter ? sqs.find(query.filter) : {},
    order: query.sort ? sqs.sort(query.sort) : []
  });
}

GroupsResource.create = async ({ body }) => db.Group.create(body);

export default GroupsResource;