const mongodb = require('../db/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  try {
    const result = await mongodb.getDb().db().collection('workoutLogs').find();
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getSingle = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json('Must use a valid workout log id to find a workout log.');
    }
    const workoutLogId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db().collection('workoutLogs').find({ _id: workoutLogId });
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists[0]);
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createWorkoutLog = async (req, res) => {
  try {
    const workoutLog = {
      workoutId: req.body.workoutId,
      exerciseId: req.body.exerciseId,
      sets: req.body.sets,
      reps: req.body.reps,
      weightUsed: req.body.weightUsed
    };
    const response = await mongodb.getDb().db().collection('workoutLogs').insertOne(workoutLog);
    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json(response.error || 'Some error occurred while creating the workout log.');
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateWorkoutLog = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json('Must use a valid workout log id to update a workout log.');
    }
    const workoutLogId = new ObjectId(req.params.id);
    const workoutLog = {
      workoutId: req.body.workoutId,
      exerciseId: req.body.exerciseId,
      sets: req.body.sets,
      reps: req.body.reps,
      weightUsed: req.body.weightUsed
    };
    const response = await mongodb.getDb().db().collection('workoutLogs').replaceOne({ _id: workoutLogId }, workoutLog);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred while updating the workout log.');
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteWorkoutLog = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json('Must use a valid workout log id to delete a workout log.');
    }
    const workoutLogId = new ObjectId(req.params.id);
    const response = await mongodb.getDb().db().collection('workoutLogs').deleteOne({ _id: workoutLogId });
    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred while deleting the workout log.');
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getAll, getSingle, createWorkoutLog, updateWorkoutLog, deleteWorkoutLog };