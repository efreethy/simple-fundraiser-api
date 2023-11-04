'use strict';

import { expect } from 'expect.js';
import { Task, User } from '../../db/models';

describe('models/index', () => {
  it('returns the task model', () => {
    const models = require('../../db/models');
    expect(models.Task).to.be.ok();
  });

  it('returns the user model', () => {
    const models = require('../../db/models');
    expect(models.User).to.be.ok();
  });
});