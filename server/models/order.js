'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
	class Order extends Model {
		static associate(models) {
			Order.belongsTo(models.Athlete, { foreignKey: "id" });
		}
	}

	Order.init({
		price: {
			type: DataTypes.INTEGER,
			defaultValue: 0,
		},
		status: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notNull: {
					args: true,
					msg: "Status is required.",
				},
				notEmpty: {
					args: true,
					msg: "Status cannot be empty.",
				},
			},
		},
		order_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			validate: {
				notNull: {
					args: true,
					msg: "Order Id is required.",
				},
				notEmpty: {
					args: true,
					msg: "Order Id cannot be empty.",
				},
			},
		},
		AthleteId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			validate: {
				notNull: {
					args: true,
					msg: "Athlete Id is required.",
				},
			},
		}
	},
	 {
		sequelize,
		modelName: 'Order',
	}
	);
	return Order;
};
