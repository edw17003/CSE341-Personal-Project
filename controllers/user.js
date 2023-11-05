const db = require('../models');
const User = db.users;
const mongodb = require('mongodb');
const bcrypt = require('bcrypt');

const apiKey =
  'Ezl0961tEpx2UxTZ5v2uKFK91qdNAr5npRlMT1zLcE3Mg68Xwaj3N8Dyp1R8IvFenrVwHRllOUxF0Og00l0m9NcaYMtH6Bpgdv7N';

exports.create = async (req, res) => {
  // #swagger.tags = ['Users']
  // #swagger.summary = 'Create User'
  // #swagger.description = 'Create a user and insert it into the database'
  /* #swagger.parameters['user'] = {
      in: 'body',
      description: 'The user to be inserted',
      required: true,
      schema: { $ref: '#definitions/UserInput' }
  } */
  if (!req.body.username) {
    res.status(400).send({ message: 'Content can not be empty!' });
    return;
  }

  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
    console.log(hashedPassword);

    const user = new User({
      _id: req.body._id,
      username: req.body.username,
      password: hashedPassword,
      email: req.body.email,
      displayName: req.body.displayName,
      accessLevel: req.body.accessLevel,
      dateOfBirth: req.body.dateOfBirth,
      phoneNumber: req.body.phoneNumber,
    });

    const data = await user.save();
    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message || 'An error occurred while creating the user.',
    });
  }
};

exports.findAll = (req, res) => {
  // #swagger.tags = ['Users']
  // #swagger.summary = 'Get all users'
  // #swagger.description = 'Get all users information from the database'
  if (req.header('apiKey') === apiKey) {
    User.find(
      {},
      {
        _id: 1,
        username: 1,
        password: 1,
        email: 1,
        displayName: 1,
        accessLevel: 1,
        dateOfBirth: 1,
        phoneNumber: 1,
      }
    )
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || 'An error occurred while retrieving user.',
        });
      });
  } else {
    res.send('Invalid apiKey, please read the documentation.');
  }
};

exports.findOne = (req, res) => {
  // #swagger.tags = ['Users']
  // #swagger.summary = 'Get a user'
  // #swagger.description = 'Get a user's information from the database'
  const _id = req.params._id;
  if (req.header('apiKey') === apiKey) {
    User.find({ _id: _id })
      .then((data) => {
        if (!data)
          res
            .status(404)
            .send({ message: 'No user found with id ' + _id });
        else res.send(data[0]);
      })
      .catch((err) => {
        res.status(500).send({
          message: 'Error retrieving user with id ' + _id,
        });
      });
  } else {
    res.send('Invalid apiKey, please read the documentation.');
  }
};

exports.updateOne = async (req, res) => {
  // #swagger.tags = ['Users']
  // #swagger.summary = 'Update user'
  // #swagger.description = 'Update a user's information in the database'
  /* #swagger.parameters['user'] = {
      in: 'body',
      description: 'The new information for the user',
      required: true,
      schema: { $ref: '#definitions/UserInput' }
  } */
  const _id = new mongodb.ObjectId(req.params._id);
  const user = {
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
    displayName: req.body.displayName,
    accessLevel: req.body.accessLevel,
    dateOfBirth: req.body.dateOfBirth,
    phoneNumber: req.body.phoneNumber,
  };

  if (req.header('apiKey') === apiKey) {
    try {
      const updatedUser = await User.findByIdAndUpdate(_id, user, { new: true });

      if (!updatedUser) {
        return res.status(404).send({ message: 'No user found with id ' + _id});
      }

      return res.status(204).json(updatedUser);
    } catch (err) {
      return res.status(500).send({ message: 'Error updating user: ' + err.message });
    }
  } else {
    return res.status(401).send('Invalid apiKey, please read the documentation.');
  }
};

exports.deleteOne = (req, res) => {
  // #swagger.tags = ['Users']
  // #swagger.summary = 'Delete user'
  // #swagger.description = 'Delete a user from the database'
  const _id = req.params._id;
  if (req.header('apiKey') === apiKey) {
    User.deleteOne({ _id: _id })
      .then((data) => {
        if (data.deletedCount) {
          res.send({ message: 'User deleted successfully.' });
        } else {
          res.status(404).send({ message: 'User not found with id ' + _id });
        }
      })
      .catch((err) => {
        res.status(500).send({ message: 'Error deleting user with id ' + _id });
      });
  } else {
    res.send('Invalid apiKey, please read the documentation.');
  }
};
