'use strict';

import app from '../../app';
import Bluebird from 'bluebird';
import expect from 'expect.js';
import request from 'supertest';

describe('user creation page', function () {
  before(function () {
      return require('../../db/models').sequelize.sync();
  });
  
  beforeEach(function () {
    const models = require('../../db/models');

    return Bluebird.all([
      models.Task.destroy({ truncate: true }),
      models.User.destroy({ truncate: true })
    ]);
  });

  it('loads correctly', function (done) {
    request(app).get('/').expect(200, done);
  });

  it('lists a user if there is one', function (done) {
    models.User.create({ username: 'johndoe' }).then(function () {
      request(app).get('/').expect(/johndoe/, done);
    })
  });

  it('lists the tickets for the user if available', function (done) {
    models.User.create({ username: 'johndoe' }).bind(this).then(function (user) {
      return models.Task.create({ title: 'johndoe task', UserId: user.id });
    }).then(function () {
      request(app).get('/').expect(/johndoe task/, done);
    });
  });
});