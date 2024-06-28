const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Product = require("../models/Products");

// Route to upload new product
router.post("/", auth, async (req, res, next) => {
	try {
		const product = new Product(req.body);
		await product.save();
		return res.sendStatus(201);
	} catch (error) {
		console.error(error);
		next(error); // Pass the error to the error handler middleware
	}
});

module.exports = router;
