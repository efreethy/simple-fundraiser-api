'use strict';

import ShortUniqueId from 'short-unique-id';
import { Sequelize, Op } from 'sequelize';

const ID_PREFIX = 'account-';

export default (sequelize: Sequelize, DataTypes: any) => {
  const Account = sequelize.define('Account', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
      unique: true,
      field: 'id',
      defaultValue: () => {
        const uid = new ShortUniqueId();
        return `${ID_PREFIX+uid.randomUUID(12)}`;
      },
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'username',
    },
    passwordHash: { 
      type: DataTypes.STRING,
      allowNull: false,
      field: 'password_hash',
    },
    password: {
      type: DataTypes.VIRTUAL,
      set: function (val: string) {
        this.setDataValue('passwordHash', val);
      },
    },
    accountType: { 
      type: DataTypes.STRING,
      validate: {
        isIn: {
          args: [['REPRESENTATIVE', 'SPONSOR']],
          msg: "Invalid user_type provided",
        },
      },
      allowNull: false,
      field: 'account_type',
    },
    email: { 
      type: DataTypes.STRING,
      validate:  {
        isEmail: true,
      },
      field: 'email',
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
      field: 'created_at',
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
      field: 'updated_at',
    },
  }, {
    tableName: 'accounts',
    timestamps: true,
    underscoredAll: true,
  });

  Account.findByUsernameOrEmail = ({ username, email }: { username: string, email: string }) => {
    const or: any[] = [];
    if (username) or.push({ username });
    if (email) or.push({ email });
    
    return Account.findOne({ where: { [Op.or]: or } });
  };

  Account.associate = function (models: any) {
    Account.belongsToMany(models.Fundraiser, {through: 'AccountFundraiser'});
  };

  return Account;
};