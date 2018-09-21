'use strict';

var ShortUniqueId = require('short-unique-id');
const ID_PREFIX = 'prize-'

module.exports = (sequelize, DataTypes) => {
  const Prize = sequelize.define('Prize', {
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
    unitCost: {
      type: DataTypes.FLOAT,
      allowNull: false,
      field: 'unit_cost',
    },
    unitsPerCase: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'units_per_case',
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
    tableName: 'prizes',
    timestamps: true,
    underscoredAll: true,
  });

  Prize.associate = function (models) {
    Prize.hasMany(models.PrizeLevel, { as: 'prizeLevels', foreignKey: 'prizeId' })
  };

  return Prize;
};