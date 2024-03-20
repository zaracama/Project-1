/** @format */

const express = require("express");
const router = express.Router();

const Digimon = require("../controllers/digimon");

router.get("/", Digimon.digimondata);
router.get("/:id", Digimon.digimonDetail);

module.exports = router;