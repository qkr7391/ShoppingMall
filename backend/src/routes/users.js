const express = require("express");
const router = express.Router();
const User = require("../models/User"); // Ensure this path is correct

// Route to register a new user
router.post("/register", async (req, res, next) => {
	try {
		const user = new User(req.body);
		await user.save();
		return res.sendStatus(200);
	} catch (error) {
		console.error(error);
		next(error); // Pass the error to the error handler middleware
	}
});

module.exports = router;
