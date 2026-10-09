const mongodb = require('../db/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  try {
    const result = await mongodb.getDb().db().collection('workouts').find();
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
      return res.status(400).json('Must use a valid workout id to find a workout.');
    }
    const workoutId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db().collection('workouts').find({ _id: workoutId });
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists[0]);
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createWorkout = async (req, res) => {
  try {
    const workout = {
      userId: req.body.userId,
      name: req.body.name,
      focusArea: req.body.focusArea,
      date: req.body.date
    };
    const response = await mongodb.getDb().db().collection('workouts').insertOne(workout);
    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json(response.error || 'Some error occurred while creating the workout.');
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateWorkout = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json('Must use a valid workout id to update a workout.');
    }
    const workoutId = new ObjectId(req.params.id);
    const workout = {
      userId: req.body.userId,
      name: req.body.name,
      focusArea: req.body.focusArea,
      date: req.body.date
    };
    const response = await mongodb.getDb().db().collection('workouts').replaceOne({ _id: workoutId }, workout);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred while updating the workout.');
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteWorkout = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json('Must use a valid workout id to delete a workout.');
    }
    const workoutId = new ObjectId(req.params.id);
    const response = await mongodb.getDb().db().collection('workouts').deleteOne({ _id: workoutId });
    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred while deleting the workout.');
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getAll, getSingle, createWorkout, updateWorkout, deleteWorkout };