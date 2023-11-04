import fs from 'fs';
import path from 'path';

import continuationLocalStorage from 'continuation-local-storage';
import Sequelize, { SequelizeOptions } from 'sequelize';

import config from '../config';

const db: any = {};

if (config.use_env_variable) {
  const { username, password, database, host, dialect } = config;
  let sequelize = new Sequelize(process.env.DATABASE_URL, {
    username,
    password,
    database,
    dialect,
    host, 
    protocol: 'postgres',
  } as SequelizeOptions);
} else {
  let sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(`${__dirname}/models`)
  .filter(file => (file.indexOf('.') !== 0) && (file !== 'index.js') && (file.slice(-3) === '.js'))
  .forEach(file => {
    let model = sequelize.import(path.join(`${__dirname}/models`, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.Sequelize.useCLS(continuationLocalStorage.createNamespace('transaction'));

export default db;