/** @format */

const errHandler = (err, req, res, next) => {
	switch (err.name) {
		case "ValidationError":
		case "SequelizeValidationError":
		case "SequelizeUniqueConstraintError":
		case "ReferenceError":
		case "InsufficientAmountError":
			res.status(400).json({ message: err.errors[0].message });
			break;

		case "NotFoundError":
			res.status(404).json({ message: "404 Error Not found" });
			break;

		case "Unauthorized":
		case "AuthenticationError":
		case "JsonWebTokenError":
			res.status(401).json({ message: "Authentication firessed" });
			break;

		case "ForbiddenError":
		case "AuthorizationError":
			res.status(403).json({ message: "Forbidden firessed" });
			break;

		default:
			res.status(500).json({ message: "Internal Server Error" });
			break;
	}
};

module.exports = errHandler;