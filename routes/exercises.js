const express = require('express');
const router = express.Router();
const exercisesController = require('../controllers/exercises');
const { exerciseValidationRules, validate } = require('../middleware/validate');

router.get('/', exercisesController.getAll);
router.get('/:id', exercisesController.getSingle);
router.post('/', exerciseValidationRules(), validate, exercisesController.createExercise);
router.put('/:id', exerciseValidationRules(), validate, exercisesController.updateExercise);
router.delete('/:id', exercisesController.deleteExercise);

module.exports = router;