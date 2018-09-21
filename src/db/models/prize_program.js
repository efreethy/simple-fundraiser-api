'use strict';

var ShortUniqueId = require('short-unique-id');
const ID_PREFIX = 'prizeProgram-'

module.exports = (sequelize, DataTypes) => {
  const PrizeProgram = sequelize.define('PrizeProgram', {
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
      field: 'name',
      allowNull: false,
      field: 'name',
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
    tableName: 'prize_programs',
    timestamps: true,
    underscoredAll: true,
  });

  PrizeProgram.associate = function (models) {
   
    PrizeProgram.hasMany(models.PrizeLevel, { as: 'prizeLevels', foreignKey: 'prizeProgramId' })
  };

  return PrizeProgram;
};