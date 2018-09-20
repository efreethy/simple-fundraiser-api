'use strict';

var ShortUniqueId = require('short-unique-id');
const ID_PREFIX = 'accountFundraiser-'

module.exports = (sequelize, DataTypes) => {
  const AccountFundraiser = sequelize.define('AccountFundraiser', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
      unique: true,
      defaultValue: () => {
        var uid = new ShortUniqueId();
        return `${ID_PREFIX+uid.randomUUID(12)}`
      },
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    accountId: {
      allowNull: false,
      type: DataTypes.STRING,
      references: { model: 'Account', key: 'id' }
    }, 
    fundraiserId: {
      allowNull: false,
      type: DataTypes.STRING,
      references: { model: 'Fundraiser', key: 'id' }
    },
  }, {
    tableName: 'account_fundraisers',
    timestamps: true,
    underscoredAll: true,
  });

  AccountFundraiser.associate = function (models) {
    AccountFundraiser.belongsTo(models.Account)
    AccountFundraiser.belongsTo(models.Fundraiser)
  };

  return AccountFundraiser;
};