/** @format */

const express = require("express");
const router = express.Router();
const athleteRoutes = require("./athlete");
const digimonRoutes = require("./digimon");
const myDigimonRoutes = require("./myDigimon");
const orderRoutes = require("./order");

router.get("/", (req, res) => {
	res.status(200).json({ message: "tes" });
});

router.use("/players", athleteRoutes);
router.use("/pokemons", digimonRoutes);
router.use("/mypokemons", myDigimonRoutes);
router.use("/orders", orderRoutes);

module.exports = router;