const express = require('express');
const router = express.Router();
const workoutLogsController = require('../controllers/workoutLogs');

router.get('/', workoutLogsController.getAll);
router.get('/:id', workoutLogsController.getSingle);
router.post('/', workoutLogsController.createWorkoutLog);
router.put('/:id', workoutLogsController.updateWorkoutLog);
router.delete('/:id', workoutLogsController.deleteWorkoutLog);

module.exports = router;