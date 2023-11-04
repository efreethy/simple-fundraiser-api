'use strict';

import { DataTypes, Model, Sequelize } from 'sequelize';
import { ShortUniqueId } from 'short-unique-id';

const ID_PREFIX = 'accountFundraiser-';

interface AccountFundraiserAttributes {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  accountId: string;
  fundraiserId: string;
}

module.exports = (sequelize: Sequelize) => {
  class AccountFundraiser extends Model<AccountFundraiserAttributes> implements AccountFundraiserAttributes {
    public id!: string;
    public createdAt!: Date;
    public updatedAt!: Date;
    public accountId!: string;
    public fundraiserId!: string;

    static associate(models: any) {
      AccountFundraiser.belongsTo(models.Account);
      AccountFundraiser.belongsTo(models.Fundraiser);
    }
  }

  AccountFundraiser.init(
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
        unique: true,
        defaultValue: () => {
          const uid = new ShortUniqueId();
          return `${ID_PREFIX + uid.randomUUID(12)}`;
        },
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      accountId: {
        allowNull: false,
        type: DataTypes.STRING,
        references: { model: 'Account', key: 'id' },
      },
      fundraiserId: {
        allowNull: false,
        type: DataTypes.STRING,
        references: { model: 'Fundraiser', key: 'id' },
      },
    },
    {
      sequelize,
      tableName: 'account_fundraisers',
      timestamps: true,
      underscoredAll: true,
    }
  );

  return AccountFundraiser;
};