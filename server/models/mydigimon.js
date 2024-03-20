'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class MyDigimon extends Model {
    static associate(models) {
      MyDigimon.belongsTo(models.Athlete, { foreignKey: "AthleteId" });
      MyDigimon.belongsTo(models.Digimon, { foreignKey: "DigimonId" });
    }
  }

  MyDigimon.init({
    AthleteId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Athlete Id is required.",
        },
      }
    },
    DigimonId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Digimon Id is required.",
        },
      }
    }
  }, {
    sequelize,
    modelName: 'MyDigimon',
  });

  return MyDigimon;
};
