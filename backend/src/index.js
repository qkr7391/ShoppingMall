const express = require("express");
const path = require("path");
const cors = require("cors");

//constants
const PORT = 4000;
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
	res.send("Hello, World!");
});

app.post("/", (req, res) => {
	console.log(req.body);
	res.json(req.body);
});

//Use absolute paths to be accessible from any path
app.use(express.static(path.join(__dirname, "../uploads")));

app.listen(PORT, () => {
	console.log(`PORT is running on ${PORT}now.`);
});
