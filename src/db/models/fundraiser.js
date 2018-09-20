'use strict';

var ShortUniqueId = require('short-unique-id');
const ID_PREFIX = 'fundraiser-'

module.exports = (sequelize, DataTypes) => {
  const Fundraiser = sequelize.define('Fundraiser', {
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
    unitsIssued: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'units_issued',
    },
    freeUnitsIssued: {
      type: DataTypes.INTEGER,
      field: 'free_units_issued',
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'start_date',
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'end_date',
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
      type: DataTypes.STRING,
      references: { model: 'Account', key: 'id' },
      field: 'account_id',
    },
    groupId: {
      type: DataTypes.STRING,
      references: { model: 'group', key: 'id' },
      field: 'group_id',
    },
  }, {
    tableName: 'fundraisers',
    timestamps: true,
    underscoredAll: true,
  });

  Fundraiser.associate = function (models) {
    Fundraiser.belongsTo(models.Account, { foreignKey: 'accountId' })
    Fundraiser.belongsTo(models.Group, { as: 'group', foreignKey: 'groupId' })
    Fundraiser.belongsToMany(models.Account, {through: 'AccountFundraiser'});
  };

  return Fundraiser;
};