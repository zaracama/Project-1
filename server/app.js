/** @format */

if (process.env.NODE_ENV !== "production") {
	const dotenv = require("dotenv");
	dotenv.config();
}
const express = require("express");
const cors = require("cors");
const app = express();
const routes = require("./routes");

const errHandler = require("./middlewares/errHandler");

app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(express.json());

app.use("/", routes);
app.use(errHandler);

module.exports = app;