const express = require("express");

//constants
const PORT = 4000;
const app = express();

app.get("/", (req, res) => {
	res.send("Hello, World!");
});

app.listen(PORT, () => {
	console.log("PORT is running on 4000 now.");
});
