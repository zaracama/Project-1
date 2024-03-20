'use strict';
const { Model } = require('sequelize');
const { encodePassword } = require('../helpers/bcryptjs');

module.exports = (sequelize, DataTypes) => {
  class Athlete extends Model {
    static associate(models) {
      Athlete.hasMany(models.MyDigimon, { foreignKey: "AthleteId" });
      Athlete.hasMany(models.Order, { foreignKey: "AthleteId" });
    }
  }

  Athlete.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Username is required.",
        },
        notEmpty: {
          args: true,
          msg: "Username cannot be empty.",
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: {
          args: true,
          msg: "Email is required.",
        },
        notEmpty: {
          args: true,
          msg: "Email cannot be empty.",
        },
        isEmail: {
          args: true,
          msg: "Invalid email format.",
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Password is required.",
        },
        notEmpty: {
          args: true,
          msg: "Password cannot be empty.",
        },
      },
    },
    amount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Address is required.",
        },
        notEmpty: {
          args: true,
          msg: "Address cannot be empty.",
        }
      },
    },
  },
   {
    hooks: {
      beforeCreate(instance) {
        instance.password = encodePassword(instance)
      },
    },
    sequelize,
    modelName: 'Athlete',
  },
  );
  return Athlete;
};