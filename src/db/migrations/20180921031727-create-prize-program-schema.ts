'use strict';

import { QueryInterface, Sequelize } from 'sequelize';

module.exports = {
  up: (queryInterface: QueryInterface, Sequelize: Sequelize) => {
    return queryInterface.createTable('prizes', {
      id: {
        primaryKey: true,
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      unit_cost: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      units_per_case: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
      account_id: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    }).then(() => {
      return queryInterface.createTable('prize_programs', {
        id: {
          primaryKey: true,
          type: Sequelize.STRING,
          allowNull: false,
          unique: true,
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        created_at: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        updated_at: {
          type: Sequelize.DATE,
          allowNull: false
        },
        account_id: {
          type: Sequelize.STRING,
          allowNull: false,
        },
      }).then(() => {
        return queryInterface.createTable('prize_levels', {
          id: {
            primaryKey: true,
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
          },
          units_required: {
            type: Sequelize.INTEGER,
            allowNull: false,
          },
          prize_program_id: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          prize_id: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          level: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          created_at: {
            type: Sequelize.DATE,
            allowNull: false,
          },
          updated_at: {
            type: Sequelize.DATE,
            allowNull: false
          },
          account_id: {
            type: Sequelize.STRING,
            allowNull: false,
          },
        })
      }).then(() => {
        return queryInterface.createTable('fundraiser_prize_programs', {
          id: {
            primaryKey: true,
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
          },
          account_id: {
            type: Sequelize.STRING,
            allowNull: false
          },
          fundraiser_id: {
            type: Sequelize.STRING,
            allowNull: false
          },
          prize_program_id: {
            type: Sequelize.STRING,
            allowNull: false
          },
          created_at: {
            type: Sequelize.DATE,
            allowNull: false,
          },
          updated_at: {
            type: Sequelize.DATE,
            allowNull: false
          }
        })
      })
    })
  },

  down: (queryInterface: QueryInterface, Sequelize: Sequelize) => {
    return queryInterface.dropTable('prizes')
      .then(() => queryInterface.dropTable('prize_programs'))
      .then(() => queryInterface.dropTable('prize_levels'))
      .then(() => queryInterface.dropTable('fundraiser_prize_programs'))
  }
};