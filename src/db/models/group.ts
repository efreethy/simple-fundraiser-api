'use strict';

import { DataTypes, Model, Sequelize } from 'sequelize';
import { ShortUniqueId } from 'short-unique-id';

const ID_PREFIX = 'group-';

interface GroupAttributes {
  id: string;
  name: string;
  groupType: 'SCHOOL' | 'LEAGUE';
  createdAt: Date;
  updatedAt: Date;
  accountId: string;
}

class Group extends Model<GroupAttributes> implements GroupAttributes {
  public id!: string;
  public name!: string;
  public groupType!: 'SCHOOL' | 'LEAGUE';
  public createdAt!: Date;
  public updatedAt!: Date;
  public accountId!: string;

  static associate(models: any) {
    Group.hasMany(models.Fundraiser, { as: 'fundraisers', foreignKey: 'groupId' });
  }
}

export default (sequelize: Sequelize, DataTypes: typeof DataTypes) => {
  Group.init(
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
      groupType: {
        type: DataTypes.STRING,
        validate: {
          isIn: {
            args: [['SCHOOL', 'LEAGUE']],
            msg: 'Invalid group_type provided',
          },
        },
        allowNull: false,
        field: 'group_type',
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
      tableName: 'groups',
      timestamps: true,
      underscoredAll: true,
    }
  );

  return Group;
};