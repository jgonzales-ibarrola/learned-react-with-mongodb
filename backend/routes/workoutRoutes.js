const express = require('express')
const Workout = require('../models/workout');
const router = express.Router();

router.get('/', () => {
  console.log("Inside of workouts")
})

router.post('/create', async (req, res) => {
  const {title, load, reps} = req.body;

  try {
    const workoutExist = await Workout.findOne({title});

    if (workoutExist) {
      res.status(404).json({error: "workout title exist!"})
    }

    const workout = await Workout.create({
      title,
      load,
      reps
    })
    res.status(200).json(workout)
  } catch (error) {
    console.log("error creating new workout!")
    res.status(404).json({
      error: error.message
    })
  }

  res.json()
})

module.exports = router;