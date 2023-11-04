'use strict';

import { DataTypes, Model, Sequelize } from 'sequelize';
import { ShortUniqueId } from 'short-unique-id';

const ID_PREFIX = 'prizeLevel-';

interface PrizeLevelAttributes {
  id: string;
  unitsRequired: number;
  level: string;
  createdAt: Date;
  updatedAt: Date;
  prizeId: string;
  prizeProgramId: string;
  accountId: string;
}

module.exports = (sequelize: Sequelize, DataTypes: typeof DataTypes) => {
  class PrizeLevel extends Model<PrizeLevelAttributes> implements PrizeLevelAttributes {
    public id!: string;
    public unitsRequired!: number;
    public level!: string;
    public createdAt!: Date;
    public updatedAt!: Date;
    public prizeId!: string;
    public prizeProgramId!: string;
    public accountId!: string;

    static associate(models: any) {
      PrizeLevel.belongsTo(models.PrizeProgram, { as: 'prizeProgram', foreignKey: 'prizeProgramId' });
      PrizeLevel.belongsTo(models.Prize, { as: 'prize', foreignKey: 'prizeId' });
    }
  }

  PrizeLevel.init(
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
    },
    {
      sequelize,
      tableName: 'prize_levels',
      timestamps: true,
      underscoredAll: true,
    }
  );

  return PrizeLevel;
};