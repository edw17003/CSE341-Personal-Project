const db = require('../models');
const User = db.users;
const mongodb = require('mongodb')

const apiKey =
  'Ezl0961tEpx2UxTZ5v2uKFK91qdNAr5npRlMT1zLcE3Mg68Xwaj3N8Dyp1R8IvFenrVwHRllOUxF0Og00l0m9NcaYMtH6Bpgdv7N';

exports.create = (req, res) => {
  // Validate request
  if (!req.body.username) {
    res.status(400).send({ message: 'Content can not be empty!' });
    return;
  }

  // Create a user
  const user = new User({
    _id: req.body._id,
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
    displayName: req.body.displayName,
    accessLevel: req.body.accessLevel
  });
  // Save user in the database
  user
    .save(user)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'An error occurred while creating the user.',
      });
    });
};

exports.findAll = (req, res) => {
  if (req.header('apiKey') === apiKey) {
    User.find(
      {},
      {
        _id: 1,
        username: 1,
        password: 1,
        email: 1,
        displayName: 1,
        accessLevel: 1
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

// Find a single user with an id
exports.findOne = (req, res) => {
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

// Update a single user by id
exports.updateOne = async (req, res) => {
  const _id = new mongodb.ObjectId(req.params._id);
  const user = {
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
    displayName: req.body.displayName,
    accessLevel: req.body.accessLevel
  };

  if (req.header('apiKey') === apiKey) {
    try {
      const updatedUser = await User.findByIdAndUpdate(_id, user, { new: true });

      if (!updatedUser) {
        return res.status(404).send({ message: 'No user found with id ' + _id});
      }

      return res.status(200).json(updatedUser);
    } catch (err) {
      return res.status(500).send({ message: 'Error updating user: ' + err.message });
    }
  } else {
    return res.status(401).send('Invalid apiKey, please read the documentation.');
  }
};


// Delete a single user by id
exports.deleteOne = (req, res) => {
  const _id = req.params._id;
  if (req.header('apiKey') === apiKey) {
    User.deleteOne({ _id: _id })
      .then((data) => {
        if (data.deletedCount) {
          res.send({ message: 'User deleted successfully.' });
        } else {
          res.status(404).send({ message: 'USer not found with id ' + _id });
        }
      })
      .catch((err) => {
        res.status(500).send({ message: 'Error deleting user with id ' + _id });
      });
  } else {
    res.send('Invalid apiKey, please read the documentation.');
  }
};