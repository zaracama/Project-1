'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
	class Digimon extends Model {
		static associate(models) {
			Digimon.belongsToMany(models.Athlete, {
				through: models.MyDigimon,
				foreignKey: "DigimonId"
			});
		}
	}

	Digimon.init({
		name: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notNull: {
					args: true,
					msg: "Name is required.",
				},
				notEmpty: {
					args: true,
					msg: "Name cannot be empty.",
				},
			},
		},
		image: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notNull: {
					args: true,
					msg: "Image is required.",
				},
				notEmpty: {
					args: true,
					msg: "Image cannot be empty.",
				},
			},
		},
		attack: {
			type: DataTypes.INTEGER,
			allowNull: false,
			validate: {
				notNull: {
					args: true,
					msg: "Attack is required.",
				},
				notEmpty: {
					args: true,
					msg: "Attack cannot be empty.",
				},
			},
		},
		healthPoint: {
			type: DataTypes.INTEGER,
			allowNull: false,
			validate: {
				notNull: {
					args: true,
					msg: "Health Point is required.",
				},
				notEmpty: {
					args: true,
					msg: "Health Point cannot be empty.",
				},
			},
		},
		initiate: {
			type: DataTypes.INTEGER,
			allowNull: false,
			validate: {
				notNull: {
					args: true,
					msg: "Initiate is required.",
				},
				notEmpty: {
					args: true,
					msg: "Initiate cannot be empty.",
				},
			},
		},
		level: {
			type: DataTypes.INTEGER,
			allowNull: false,
			validate: {
				notNull: {
					args: true,
					msg: "Levels is required.",
				},
				notEmpty: {
					args: true,
					msg: "Levels cannot be empty.",
				},
			},
		},
		type: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notNull: {
					args: true,
					msg: "Type is required.",
				},
				notEmpty: {
					args: true,
					msg: "Type cannot be empty.",
				},
			},
		},
		attribute: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notNull: {
					args: true,
					msg: "Attribute is required.",
				},
				notEmpty: {
					args: true,
					msg: "Attribute cannot be empty.",
				},
			},
		}
	}, {
		sequelize,
		modelName: 'Digimon',
	});

	return Digimon;
};
