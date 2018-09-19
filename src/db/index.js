'use strict';

import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';
import config    from '../config'

const db = {};

if (config.use_env_variable) {
  const { username, password, database, host, dialect } = config;
  var sequelize = new Sequelize(process.env.DATABASE_URL, {
    username,
    password,
    database,
    dialect,
    host, 
    protocol: 'postgres',
  });
} else {
  console.log("DEBUG THIS STUFF")
  var sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(`${__dirname}/models`)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== 'index.js') && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    var model = sequelize['import'](path.join(`${__dirname}/models`, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;