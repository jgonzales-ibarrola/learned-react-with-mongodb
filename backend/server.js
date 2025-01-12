require("dotenv").config();

const express = require("express");
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors');

const workoutRoutes = require('./routes/workoutRoutes');

const app = express();

// Middleware
app.use(bodyParser.json({ limit: "30mb", extended: true }))
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true}))
app.use(cors());

app.use((req, res, next) => {
	console.log("Path: ", req.path);
	console.log("Method: ", req.method);

	next();
});

// Routes
app.use('/api/workouts', workoutRoutes)

// Connect to DB
mongoose.connect(process.env.MONGODB_URI)
  .then((res) => {
    console.log("Connected to DB!")
  })
  .catch((err) => {
    console.log("Error occured when connecting to DB: ", err)
  })

app.listen(process.env.PORT, () => {
	console.log("listening to port 4000");
});
