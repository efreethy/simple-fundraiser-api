
import sqs from 'sequelize-querystring';

import db from '../../db';

const PrizeProgramsResource = {};

PrizeProgramsResource.list = async ({ query }) => {
  return db.PrizeProgram.findAll({
    offset: query.offset || 0,
    limit: query.limit || 10,
    where: query.filter ? sqs.find(query.filter) : {},
    order: query.sort ? sqs.sort(query.sort) : [],
    include: [{ 
      model: db.PrizeLevel, 
      as: 'prizeLevels',
      include: [{ model: db.Prize, as: 'prize' }]
    }]
  });
}

PrizeProgramsResource.create = async ({ body }) => {
  return db.PrizeProgram.create(
    body, { 
      include: 
        [{ 
          model: db.PrizeLevel, as: 'prizeLevels', 
          include: [{ 
            model: db.Prize, as: 'prize' , ignoreDuplicates: true, updateOnDuplicate: ['name'], 
          }]
        }] 
    }
  )
}

export default PrizeProgramsResource;