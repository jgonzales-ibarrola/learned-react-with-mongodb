const express = require('express')
const {createWorkout, getWorkouts, getSingleWorkout, deleteWorkout, updateWorkout} = require('../controllers/workoutControllers')
const router = express.Router();

router.get('/', getWorkouts)

router.post('/create', createWorkout)

router.get('/:id', getSingleWorkout)

router.delete('/:id', deleteWorkout);

router.patch('/:id', updateWorkout)

module.exports = router;