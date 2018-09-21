'use strict';

var ShortUniqueId = require('short-unique-id');
const ID_PREFIX = 'prizeLevel-'

module.exports = (sequelize, DataTypes) => {
  const PrizeLevel = sequelize.define('PrizeLevel', {
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
    unitsRequired: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'units_required',
    },
    level: { 
      type: DataTypes.STRING,
      allowNull: false,
      field: 'level',
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
    prizeId: {
      type: DataTypes.STRING,
      references: { model: 'Prize', key: 'id' },
      field: 'prize_id',
    },
    prizeProgramId: {
      type: DataTypes.STRING,
      references: { model: 'PrizeProgram', key: 'id' },
      field: 'prize_program_id',
    },
    accountId: {
      allowNull: false,
      type: DataTypes.STRING,
      references: { model: 'Account', key: 'id' },
      field: 'account_id',
    },
  }, {
    tableName: 'prize_levels',
    timestamps: true,
    underscoredAll: true,
  });

  PrizeLevel.associate = function (models) {
    PrizeLevel.belongsTo(models.PrizeProgram, { as: 'prizeProgram', foreignKey: 'prizeProgramId' })
    PrizeLevel.belongsTo(models.Prize, { as: 'prize', foreignKey: 'prizeId' })
  };

  return PrizeLevel;
};