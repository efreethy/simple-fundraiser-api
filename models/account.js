'use strict';

var ShortUniqueId = require('short-unique-id');
const ID_PREFIX = 'acc_'

module.exports = (sequelize, DataTypes) => {
  const Account = sequelize.define('Account', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
      unique: true,
      defaultValue: () => {
        var uid = new ShortUniqueId();
        return `${ID_PREFIX+uid.randomUUID(6)}`
      },
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password_hash: { 
      type: DataTypes.STRING,
      allowNull: false
    },
    user_type: { 
      type: DataTypes.STRING,
      validate: {
        isIn: {
          args: [['REPRESENTATIVE', 'SPONSOR']],
          msg: "Invalid user_type provided"
        }
      },
      allowNull: false,
    },
    email: { 
      type: DataTypes.STRING,
      validate:  {
        isEmail: true
      }
    },
    created_at: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updated_at: {
      allowNull: false,
      type: DataTypes.DATE
    },
  }, {
    tableName: 'accounts',
    underscored: true,
  });
  Account.associate = function(models) {
    // associations can be defined here
  };
  return Account;
};