const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Product = require("../models/Products");
const multer = require("multer");

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "uploads/");
	},
	filename: function (req, file, cb) {
		cb(null, `${Date.now()}_${file.originalname}`);
	},
});

const upload = multer({ storage: storage }).single("file");

router.get("/", async (req, res, next) => {
	const order = req.query.order ? req.query.order : "desc";
	const sortBy = req.query.sortBy ? req.query.sortBy : "_id";
	const limit = req.query.limit ? Number(req.query.limit) : 20;
	const skip = req.query.skip ? Number(req.query.skip) : 0;

	let findArgs = {};
	for (const key in req.query.filters) {
		if (req.query.filters[key].length > 0) {
			if (key === "price") {
				findArgs[key] = {
					$gte: req.query.filters[key][0],

					$lte: req.query.filters[key][1],
				};
			} else {
				findArgs[key] = req.query.filters[key];
			}
		}
	}
	// console.log(findArgs); // -> continent index

	try {
		const products = await Product.find(findArgs)
			.populate("writer")
			.sort([[sortBy, order]])
			.skip(skip)
			.limit(limit);

		const productsTotal = await Product.countDocuments(findArgs);
		const hasMore = skip + limit < productsTotal ? true : false;

		return res.status(200).json({
			products,
			hasMore,
		});
	} catch (error) {
		next(error);
	}
});

// Route to upload new product
router.post("/", auth, async (req, res, next) => {
	try {
		const productData = {
			writer: req.user._id, // Ensure writer is set from authenticated user
			...req.body,
		};

		// console.log("product schema1", productData);

		const product = new Product(productData);
		// const product = new Product(req.body);
		// console.log("product schema2", product);
		await product.save();
		return res.sendStatus(201);
	} catch (error) {
		console.error(error);
		next(error); // Pass the error to the error handler middleware
	}
});

// Route to upload new product's images
router.post("/image", auth, async (req, res, next) => {
	upload(req, res, (err) => {
		if (err) {
			return req.statusCode(500).send(err);
		}
		return res.json({ fileName: res.req.file.filename });
	});
});

module.exports = router;
