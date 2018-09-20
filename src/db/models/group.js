'use strict';

var ShortUniqueId = require('short-unique-id');
const ID_PREFIX = 'group-'

module.exports = (sequelize, DataTypes) => {
  const Group = sequelize.define('Group', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
      unique: true,
      defaultValue: () => {
        var uid = new ShortUniqueId();
        return `${ID_PREFIX+uid.randomUUID(12)}`
      },
      field: 'id',
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'name',
    },
    groupType: { 
      type: DataTypes.STRING,
      validate: {
        isIn: {
          args: [['SCHOOL', 'LEAGUE']],
          msg: "Invalid group_type provided"
        }
      },
      allowNull: false,
      field: 'group_type',
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
      field: 'created_at',
      defaultValue: () => new Date(),
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
      field: 'updated_at',
      defaultValue: () => new Date(),
    },
    accountId: {
      allowNull: false,
      type: DataTypes.STRING,
      references: { model: 'Account', key: 'id' },
      field: 'account_id',
    },
  }, {
    tableName: 'groups',
    timestamps: true,
    underscoredAll: true,
  });

  Group.associate = function (models) {
    Group.hasMany(models.Fundraiser, { foreignKey: 'groupId'})
  };

  return Group;
};