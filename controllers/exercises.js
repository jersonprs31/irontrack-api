const mongodb = require('../db/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  try {
    const result = await mongodb.getDb().db().collection('exercises').find();
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
      return res.status(400).json('Must use a valid exercise id to find an exercise.');
    }
    const exerciseId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db().collection('exercises').find({ _id: exerciseId });
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists[0]);
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createExercise = async (req, res) => {
  try {
    const exercise = {
      name: req.body.name,
      equipment: req.body.equipment,
      muscleGroup: req.body.muscleGroup,
      description: req.body.description
    };
    const response = await mongodb.getDb().db().collection('exercises').insertOne(exercise);
    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json(response.error || 'Some error occurred while creating the exercise.');
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateExercise = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json('Must use a valid exercise id to update an exercise.');
    }
    const exerciseId = new ObjectId(req.params.id);
    const exercise = {
      name: req.body.name,
      equipment: req.body.equipment,
      muscleGroup: req.body.muscleGroup,
      description: req.body.description
    };
    const response = await mongodb.getDb().db().collection('exercises').replaceOne({ _id: exerciseId }, exercise);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred while updating the exercise.');
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteExercise = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json('Must use a valid exercise id to delete an exercise.');
    }
    const exerciseId = new ObjectId(req.params.id);
    const response = await mongodb.getDb().db().collection('exercises').deleteOne({ _id: exerciseId });
    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred while deleting the exercise.');
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getAll, getSingle, createExercise, updateExercise, deleteExercise };