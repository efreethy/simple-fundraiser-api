'use strict';

import { DataTypes, Model, Sequelize } from 'sequelize';
import { ShortUniqueId } from 'short-unique-id';

const ID_PREFIX = 'fundraiser-';

interface FundraiserAttributes {
  id: string;
  name: string;
  unitsIssued: number;
  freeUnitsIssued?: number;
  startDate: Date;
  endDate: Date;
  createdAt: Date;
  updatedAt: Date;
  accountId: string;
  groupId: string;
}

class Fundraiser extends Model<FundraiserAttributes> implements FundraiserAttributes {
  public id!: string;
  public name!: string;
  public unitsIssued!: number;
  public freeUnitsIssued?: number;
  public startDate!: Date;
  public endDate!: Date;
  public createdAt!: Date;
  public updatedAt!: Date;
  public accountId!: string;
  public groupId!: string;

  static associate(models: any) {
    Fundraiser.belongsTo(models.Account, { as: 'account', foreignKey: 'accountId' });
    Fundraiser.belongsTo(models.Group, { as: 'group', foreignKey: 'groupId' });
    Fundraiser.belongsToMany(models.Account, { through: 'AccountFundraiser' });
  }
}

export default (sequelize: Sequelize, DataTypes: typeof DataTypes) => {
  Fundraiser.init(
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
    },
    {
      sequelize,
      tableName: 'fundraisers',
      timestamps: true,
      underscoredAll: true,
    }
  );

  return Fundraiser;
};