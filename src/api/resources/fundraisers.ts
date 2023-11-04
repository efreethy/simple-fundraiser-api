import sqs from 'sequelize-querystring';
import db from '../../db';

interface QueryParams {
  offset?: number;
  limit?: number;
  filter?: string;
  sort?: string;
}

const FundraisersResource = {};

FundraisersResource.list = async ({ query }: { query: QueryParams }) => {
  return db.Fundraiser.findAll({
    offset: query.offset || 0,
    limit: query.limit || 10,
    where: query.filter ? sqs.find(query.filter) : {},
    order: query.sort ? sqs.sort(query.sort) : [],
    include: [{ model: db.Group, as: 'group' }],
  });
}

FundraisersResource.create = async ({ body }: { body: any }) => (
  db.Fundraiser.create(
    body,
    { include: [{ model: db.Group, as: 'group' }] }
  )
)

export default FundraisersResource;