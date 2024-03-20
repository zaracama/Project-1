/** @format */

const { Player } = require("../models");
const { verifyToken } = require("../helpers/token");

const authen = async (req, res, next) => {
	try {
		const token = req.headers.authorization;
		if (!token) {
			throw { name: "JsonWebTokenError" };
		}

		const [bearer, accessToken] = token.split(" ");
		if (bearer !== "Bearer") {
			throw { name: "AuthenticationError" };
		}

		const payload = verifyToken(accessToken);
		const user = await Player.findByPk(payload.id);
		if (!user) {
			throw { name: "Unauthorized" };
		}
		req.user = {
			id: user.id,
			username: user.username,
			email: user.email,
			balance: user.balance,
		};

		next();
	} catch (err) {
		next(err);
	}
};

module.exports = authen;