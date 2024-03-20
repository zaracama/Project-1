/** @format */

const axios = require("axios");

module.exports = {
	async up(queryInterface, Sequelize) {
		try {
			const digimonListResponse = await axios.get(
				"https://digimon-api.vercel.app/api/digimon"
			);
			const digimonList = digimonListResponse.data.results;

			for (const digimon of digimonList) {
				const digimonDetailsResponse = await axios.get(digimon.url);
				const digimonDetails = digimonDetailsResponse.data;

				const { name, sprites, stats, types } = digimonDetails;

				const totalStats = stats.reduce((sum, stat) => sum + stat.base_stat, 0);
				const averageStats = totalStats / stats.length;
				const evolve =
					averageStats > 80
						? "Evolution 3"
						: averageStats > 60
						? "Evolution 2"
						: averageStats > 40
						? "Evolution 1"
						: "Baby";

				const image =
					sprites.front_default ||
					"https://imgur.com/zqSWrmT";
				const digimonTypes = types.map((type) => type.type.name).join(", ");

				await queryInterface.bulkInsert("Pokemons", [
					{
						name,
						image,
						attack: stats[1].base_stat,
						defense: stats[2].base_stat,
						hp: stats[0].base_stat,
						speed: stats[5].base_stat,
						level: 1,
						type: digimonTypes,
						evolve,
						createdAt: new Date(),
						updatedAt: new Date(),
					},
				]);
			}
		} catch (error) {
			console.error(error.message);
		}
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete("Digimons", null, {
			truncate: true,
			cascade: true,
			resetIdentity: true,
		});
	},
};