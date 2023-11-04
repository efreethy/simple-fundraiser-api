'use strict';
import { QueryInterface, Sequelize } from 'sequelize';

module.exports = {
  up: (queryInterface: QueryInterface, Sequelize: Sequelize) => {
    return queryInterface.createTable('groups', {
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
      group_type: {
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
      },
      account_id: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    }).then(() => {
      queryInterface.addConstraint('groups', ['account_id', 'name'], {
        type: 'unique',
        name: 'groups-table-account_id-name-uniq-constraint'
      });
    })
    .then(() => {
      return queryInterface.createTable('fundraisers', {
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
        units_issued: {
          type: Sequelize.INTEGER,
          allowNull: false
        },
        free_units_issued: {
          type: Sequelize.INTEGER,
        },
        group_id: {
          type: Sequelize.STRING,
          allowNull: false
        },
        start_date: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        end_date: {
          type: Sequelize.DATE,
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
      });
    }).then(() => {
      return queryInterface.createTable('account_fundraisers', {
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
        group_id: {
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
  },
  down: (queryInterface: QueryInterface, Sequelize: Sequelize) => {
    return queryInterface.dropTable('groups')
      .then(queryInterface.dropTable('fundraisers'))
      .then(queryInterface.dropTable('account_fundraisers'))
  }
};