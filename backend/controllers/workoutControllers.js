const Workout = require("../models/workout");
const mongoose = require("mongoose");

const updateWorkout = async (req, res) => {
  const { id } = req.params;
  const {title,
    reps,
    load} = req.body;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ error: "ID of workout is not VALID!" });
	}

	try {
    const newWorkout = {
      title,reps,load
    }

    await Workout.findByIdAndUpdate({_id: id}, newWorkout)

    res.status(201).json(newWorkout);

  }  catch (error) {
		console.log("error updating a workout!");
		res.status(404).json({
			error: error.message,
		});
	}
}

const getWorkouts = async (req, res) => {
	const workouts = await Workout.find({}).sort({ createdAt: -1 });

	res.status(200).json(workouts);
};

const deleteWorkout = async (req, res) => {
	const { id } = req.params;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ error: "ID of workout is not VALID!" });
	}

	try {
    const workout = await Workout.findByIdAndDelete(id);

    if (!workout) {
      return res.status(404).json({ error: "No such workout to delete" });
    }

    res.status(200).json(workout);
  } catch (error) {
		console.log("error deleting a workout!");
		res.status(404).json({
			error: error.message,
		});
	}
};

const getSingleWorkout = async (req, res) => {
	const { id } = req.params;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ error: "ID of workout is not VALID!" });
	}

	const workout = await Workout.findById(id);
	if (!workout) {
		return res.status(404).json({ error: "No such workout" });
	}

	res.status(200).json(workout);
};

const createWorkout = async (req, res) => {
	const { title, load, reps } = req.body;

	try {
		const workoutExist = await Workout.findOne({ title });

		if (workoutExist) {
			res.status(404).json({ error: "workout title exist!" });
		}

		const workout = await Workout.create({
			title,
			load,
			reps,
		});
		res.status(200).json(workout);
	} catch (error) {
		console.log("error creating new workout!");
		res.status(404).json({
			error: error.message,
		});
	}
};

module.exports = {
	createWorkout,
	getWorkouts,
	getSingleWorkout,
	deleteWorkout,
  updateWorkout
};
