const express = require("express");
const router = express.Router();
const User = require("../models/User"); // Ensure this path is correct
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const async = require("async");

router.get("/auth", auth, async (req, res, next) => {
	return res.json({
		_id: req.user._id,
		email: req.user.email,
		name: req.user.name,
		role: req.user.role,
		image: req.user.image,
		// cart: req.user.cart,
		// history: req.user.history,
	});
});

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

// Route to login a user
router.post("/login", async (req, res, next) => {
	try {
		const user = await User.findOne({ email: req.body.email });

		if (!user) {
			return res.status(400).send("This user does not exist.");
		}

		const isMatch = await user.comparePassword(req.body.password);
		if (!isMatch) {
			return res.status(400).send("The passwords don't match.");
		}

		//create payload
		const payload = {
			userId: user._id.toHexString(), // mongoDB's ID is object, so need to change to string
		};

		//create JWT
		const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
			expiresIn: "1h", // Validity options
		});

		return res.json({ user, accessToken }); //send to Client
	} catch (error) {
		console.error(error);
		next(error);
	}
});

module.exports = router;
