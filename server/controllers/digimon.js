/** @format */

const { Digimon } = require("../models");
const { Op } = require("sequelize");

class ObtainDigimon {
	static async digimondata(req, res, next) {
		try {
			const { name, type, sort, order, page = 1 } = req.query;
			const limitPerPage = 100;

			const querySet = {
				where: {},
				order: [],
				limit: limitPerPage,
				offset: (page - 1) * limitPerPage,
			};

			if (name || type) {
				const term = [];
				if (name) {
					term.push({ name: { [Op.iLike]: `%${name}%` } });
				}
				if (type) {
					term.push({ type: { [Op.iLike]: `%${type}%` } });
				}

				querySet.where[Op.or] = Object.assign({}, ...term);
			}

			if (sort === "name") {
				const ordered = order === "desc" ? "DESC" : "ASC";
				querySet.order.push([sort, ordered]);
			}

			const digimons = await Digimon.findAndCountAll(querySet);
			const total = Math.ceil(digimons.count / limitPerPage);

			res.status(200).json({ digimons: digimons.rows, total });
		} catch (err) {
			console.log(err);
			next(err);
		}
	}

	static async digimonDetail(req, res, next) {
		try {
			const { id } = req.params;
			const digimon = await Digimon.findByPk(id);

			if (!digimon) {
				throw { name: "NotFoundError", message: "404 Error Not found" };
			}

			res.status(200).json(digimon);
		} catch (err) {
			next(err);
		}
	}
}

module.exports = ObtainDigimon;