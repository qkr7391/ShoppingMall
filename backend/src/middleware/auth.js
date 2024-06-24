const jwt = require("jsonwebtoken");
const User = require("../models/User");

let auth = async (req, res, next) => {
	const authHeader = req.headers["authorization"];
	console.log("Authorization Header:", authHeader);

	const token = authHeader && authHeader.split(" ")[1];
	if (token === null) return res.sendStatus(401);

	try {
		// Verify the token
		const decode = jwt.verify(token, process.env.JWT_SECRET);
		const user = await User.findOne({ _id: decode.userId });

		if (!user) {
			return res.status(400).send("User not found.");
		}

		// Attach user object to the request
		req.user = user;
		next(); // Call next middleware
	} catch (error) {
		// console.error("Auth middleware error:", error);
		next(error); // Pass error to the error handler middleware
	}
};

module.exports = auth;
