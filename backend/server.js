require("dotenv").config();

const express = require("express");

const app = express();

// Middleware
app.use((req, res, next) => {
	console.log("Path: ", req.path);
	console.log("Method: ", req.method);

	next();
});

// Routes
app.get("/", (req, res) => {
	res.json({ msg: "Welcome to your new app" });
});

app.listen(process.env.PORT, () => {
	console.log("listening to port 4000");
});
