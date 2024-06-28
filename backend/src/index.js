const express = require("express");
const path = require("path");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

//constants
const PORT = 4000;
const app = express();

app.use(cors());
app.use(express.json());

mongoose
	.connect(process.env.MONGO_URI)
	.then(() => {
		console.log("connect success");
	})
	.catch((err) => {
		console.log(err);
	});

app.get("/", (req, res) => {
	res.send("Hello, World!");
});

app.post("/", (req, res) => {
	console.log(req.body);
	res.json(req.body);
});

// app.use("/users", require("./routes/users"));

const usersRouter = require("./routes/users");
app.use("/users", usersRouter);

const productsRouter = require("./routes/products");
app.use("/products", productsRouter);

// Error Handling Middleware
app.use((error, req, res, next) => {
	console.error(error.stack); // Log the error stack trace
	res.status(500).send("Internal Server Error");
});

//Use absolute paths to be accessible from any path
app.use(express.static(path.join(__dirname, "../uploads")));

app.listen(PORT, () => {
	console.log(`PORT is running on ${PORT}now.`);
});
