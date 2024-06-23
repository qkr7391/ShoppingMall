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

		const payload = {
			userId: user._id.toHexString(),
		};

		const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
			expiresIn: "1h",
		});

		return res.json({ user, accessToken });
	} catch (error) {
		console.error(error);
		next(error);
	}
});

module.exports = router;
