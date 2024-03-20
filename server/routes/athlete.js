/** @format */

const express = require("express");
const router = express.Router();

const Athlete = require("../controllers/athleteController");
const authen = require("../middlewares/authen");

router.post("/register", Athlete.registered);
router.post("/login", Athlete.logined);
router.get("/profile", authen, Athlete.setAthleteDetail);

module.exports = router;