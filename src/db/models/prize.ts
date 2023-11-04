'use strict';

import { DataTypes, Model, Sequelize } from 'sequelize';
import { ShortUniqueId } from 'short-unique-id';

const ID_PREFIX = 'prize-';

interface PrizeAttributes {
  id: string;
  name: string;
  unitCost: number;
  unitsPerCase: number;
  createdAt: Date;
  updatedAt: Date;
  accountId: string;
}

class Prize extends Model<PrizeAttributes> implements PrizeAttributes {
  public id!: string;
  public name!: string;
  public unitCost!: number;
  public unitsPerCase!: number;
  public createdAt!: Date;
  public updatedAt!: Date;
  public accountId!: string;

  static associate(models: any) {
    Prize.hasMany(models.PrizeLevel, { as: 'prizeLevels', foreignKey: 'prizeId' });
  }
}

export default (sequelize: Sequelize, DataTypes: typeof DataTypes) => {
  Prize.init(
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
    },
    {
      sequelize,
      tableName: 'prizes',
      timestamps: true,
      underscoredAll: true,
    }
  );

  return Prize;
};