/** @format */

const express = require("express");
const router = express.Router();

const MyDigimon = require("../controllers/myDigimon");
const authen = require("../middlewares/authen");

router.get("/", authen, MyDigimon.myDigiDex);
router.post("/gacha", authen, MyDigimon.gachaDigiDex);
router.delete("/:id", authen, MyDigimon.delDigimon);

module.exports = router;