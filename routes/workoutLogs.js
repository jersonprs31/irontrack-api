const express = require('express');
const router = express.Router();
const workoutLogsController = require('../controllers/workoutLogs');
const { workoutLogValidationRules, validate } = require('../middleware/validate');

router.get('/', workoutLogsController.getAll);
router.get('/:id', workoutLogsController.getSingle);
router.post('/', workoutLogValidationRules(), validate, workoutLogsController.createWorkoutLog);
router.put('/:id', workoutLogValidationRules(), validate, workoutLogsController.updateWorkoutLog);
router.delete('/:id', workoutLogsController.deleteWorkoutLog);

module.exports = router;