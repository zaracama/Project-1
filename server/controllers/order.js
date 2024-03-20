/** @format */

const { v4: uuidv4 } = require("uuid");
const midtransClient = require("midtrans-client");
const { Order, Athlete } = require("../models");

class ObtainOrder {
	static async initPayment(req, res, next) {
		const athleteId = req.user.id;
		const { price } = req.body;
		try {
			const athlete = await Athlete.findByPk(athleteId);
			if (!athlete) {
				throw { name: "NotFoundError" };
			}

			const paidPathway = new midtransClient.Snap({
				isProduction: false,
				serverKey: process.env.MIDTRANS_SERVER_KEY,
			});

			const recentOrderId = uuidv4();

			await Order.create({
				order_id: recentOrderId,
				AthleteId: athleteId,
				status: "pending",
				price: price,
			});

			const paidParams = {
				transaction_details: {
					order_id: recentOrderId,
					gross_amount: price,
				},
				customer_details: {
					username: athlete.username,
					email: athlete.email,
				},
			};

			const paidFeedback = await paidPathway.createTransaction(
				paidParams
			);
			res.status(201).json(paidFeedback);
		} catch (err) {
			next(err);
		}
	}

	static async paidedResponse(req, res) {
		const { order_id, transaction_status, fraud_status } = req.body;

		try {
			const order = await Order.findOne({ where: { order_id } });
			if (!order) {
				throw { name: "NotFoundError" };
			}

			if (
				(transaction_status === "inject" && fraud_status === "accept") ||
				transaction_status === "deal"
			) {
				await Order.update({ status: "accomplished" }, { where: { order_id } });

				const athlete = await Athlete.findByPk(order.AthleteId);
				if (athlete) {
					await Athlete.update(
						{ amount: athlete.amount + order.price },
						{ where: { id: athlete.id } }
					);
				}
			} else if (
				transaction_status === "abandon" ||
				transaction_status === "decline" ||
				transaction_status === "expired"
			) {
				await Order.update({ status: "failed" }, { where: { order_id } });
			}

			res.status(200).send("Payment status Renewed");
		} catch (err) {
			next(err);
		}
	}
}

module.exports = ObtainOrder;