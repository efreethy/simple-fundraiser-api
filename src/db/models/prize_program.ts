'use strict';

import { DataTypes, Model, Sequelize } from 'sequelize';
import { ShortUniqueId } from 'short-unique-id';

const ID_PREFIX = 'prizeProgram-';

interface PrizeProgramAttributes {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  accountId: string;
}

module.exports = (sequelize: Sequelize, DataTypes: typeof DataTypes) => {
  class PrizeProgram extends Model<PrizeProgramAttributes> implements PrizeProgramAttributes {
    public id!: string;
    public name!: string;
    public createdAt!: Date;
    public updatedAt!: Date;
    public accountId!: string;

    static associate(models: any) {
      PrizeProgram.hasMany(models.PrizeLevel, { as: 'prizeLevels', foreignKey: 'prizeProgramId' });
    }
  }

  PrizeProgram.init(
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
      tableName: 'prize_programs',
      timestamps: true,
      underscoredAll: true,
    }
  );

  return PrizeProgram;
};