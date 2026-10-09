const express = require('express');
const router = express.Router();
const workoutsController = require('../controllers/workouts');
const { workoutValidationRules, validate } = require('../middleware/validate');
const { isAuthenticated } = require('../middleware/authenticate');

router.get('/', workoutsController.getAll);
router.get('/:id', workoutsController.getSingle);

// Secure POST, PUT, and DELETE routes with OAuth authentication
router.post('/', isAuthenticated, workoutValidationRules(), validate, workoutsController.createWorkout);
router.put('/:id', isAuthenticated, workoutValidationRules(), validate, workoutsController.updateWorkout);
router.delete('/:id', isAuthenticated, workoutsController.deleteWorkout);

module.exports = router;