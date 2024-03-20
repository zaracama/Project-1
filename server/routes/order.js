/** @format */

const express = require("express");
const router = express.Router();
const authen = require("../middlewares/authen");
const Order = require("../controllers/order");

router.post("/topup", authen, Order.initPayment);
router.post("/pay", authen, Order.paidedResponse);

module.exports = router;