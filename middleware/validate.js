const { body, validationResult } = require('express-validator');

// Rules for Users
const userValidationRules = () => {
  return [
    body('firstName', 'First name is required').notEmpty(),
    body('lastName', 'Last name is required').notEmpty(),
    body('email', 'Please include a valid email').isEmail(),
    body('age', 'Age is required and must be a number').isNumeric()
  ];
};

// Rules for Exercises
const exerciseValidationRules = () => {
  return [
    body('name', 'Name is required').notEmpty(),
    body('equipment', 'Equipment is required').notEmpty(),
    body('muscleGroup', 'Muscle group is required').notEmpty(),
    body('description', 'Description is required').notEmpty()
  ];
};

// Rules for Workouts
const workoutValidationRules = () => {
  return [
    body('userId', 'Valid User ID is required').notEmpty(),
    body('name', 'Workout name is required').notEmpty(),
    body('focusArea', 'Focus area is required').notEmpty(),
    body('date', 'Date is required').notEmpty()
  ];
};

// Rules for Workout Logs
const workoutLogValidationRules = () => {
  return [
    body('workoutId', 'Valid Workout ID is required').notEmpty(),
    body('exerciseId', 'Valid Exercise ID is required').notEmpty(),
    body('sets', 'Sets must be a number').isNumeric(),
    body('reps', 'Reps must be a number').isNumeric(),
    body('weightUsed', 'Weight must be a number').isNumeric()
  ];
};

// Middleware function to check the rules and return errors
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map(err => extractedErrors.push({ [err.path]: err.msg }));

  return res.status(400).json({
    errors: extractedErrors,
  });
};

module.exports = {
  userValidationRules,
  exerciseValidationRules,
  workoutValidationRules,
  workoutLogValidationRules,
  validate
};