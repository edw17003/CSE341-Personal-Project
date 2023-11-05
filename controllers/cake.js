const db = require('../models');
const Cake = db.cakes;

const apiKey = 'Ezl0961tEpx2UxTZ5v2uKFK91qdNAr5npRlMT1zLcE3Mg68Xwaj3N8Dyp1R8IvFenrVwHRllOUxF0Og00l0m9NcaYMtH6Bpgdv7N';

exports.createCake = async (req, res) => {
  // #swagger.tags = ['Cakes']
  // #swagger.summary = 'Create Cake'
  // #swagger.description = 'Create a cake and insert it into the database'
  /* #swagger.parameters['cake'] = {
      in: 'body',
      description: 'The cake to be inserted',
      required: true,
      schema: { $ref: '#definitions/CakeInput' }
  } */
  if (!req.body.name || !req.body.theme || !req.body.deliveryDate || !req.body.filling) {
    res.status(400).send({ message: 'Content can not be empty!' });
    return;
  }

  try {
    const cake = new Cake({
      name: req.body.name,
      flavor: req.body.flavor,
      theme: req.body.theme,
      description: req.body.description,
      deliveryDate: req.body.deliveryDate,
      filling: req.body.filling,
    });

    const data = await cake.save();
    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message || 'An error occurred while creating the cake.',
    });
  }
};

exports.getAllCakes = (req, res) => {
  // #swagger.tags = ['Cakes']
  // #swagger.summary = 'Get all cakes'
  // #swagger.description = 'Get all cake information from the database'
  if (req.header('apiKey') === apiKey) {
    Cake.find(
      {},
      {
        name: 1,
        flavor: 1,
        theme: 1,
        description: 1,
        deliveryDate: 1,
        filling: 1,
      }
    )
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || 'An error occurred while retrieving cakes.',
        });
      });
  } else {
    res.send('Invalid apiKey, please read the documentation.');
  }
};

exports.getCakeById = (req, res) => {
  // #swagger.tags = ['Cakes']
  // #swagger.summary = 'Get a cake by ID'
  // #swagger.description = 'Get cake information by ID from the database'
  const _id = req.params._id;
  if (req.header('apiKey') === apiKey) {
    Cake.find({ _id: _id })
      .then((data) => {
        if (!data)
          res
            .status(404)
            .send({ message: 'No cake found with id ' + _id });
        else res.send(data[0]);
      })
      .catch((err) => {
        res.status(500).send({
          message: 'Error retrieving cake with id ' + _id,
        });
      });
  } else {
    res.send('Invalid apiKey, please read the documentation.');
  }
};

exports.updateCake = async (req, res) => {
  // #swagger.tags = ['Cakes']
  // #swagger.summary = 'Update cake'
  // #swagger.description = 'Update cake information in the database'
  /* #swagger.parameters['cake'] = {
      in: 'body',
      description: 'The new information for the cake',
      required: true,
      schema: { $ref: '#definitions/CakeInput' }
  } */
  const _id = req.params._id;
  const cake = {
    name: req.body.name,
    flavor: req.body.flavor,
    theme: req.body.theme,
    description: req.body.description,
    deliveryDate: req.body.deliveryDate,
    filling: req.body.filling,
  };

  if (req.header('apiKey') === apiKey) {
    try {
      const updatedCake = await Cake.findByIdAndUpdate(_id, cake, { new: true });

      if (!updatedCake) {
        return res.status(404).send({ message: 'No cake found with id ' + _id });
      }

      return res.status(204).json(updatedCake);
    } catch (err) {
      return res.status(500).send({ message: 'Error updating cake: ' + err.message });
    }
  } else {
    return res.status(401).send('Invalid apiKey, please read the documentation.');
  }
};

exports.deleteCake = (req, res) => {
  // #swagger.tags = ['Cakes']
  // #swagger.summary = 'Delete cake'
  // #swagger.description = 'Delete a cake from the database'
  const _id = req.params._id;
  if (req.header('apiKey') === apiKey) {
    Cake.deleteOne({ _id: _id })
      .then((data) => {
        if (data.deletedCount) {
          res.send({ message: 'Cake deleted successfully.' });
        } else {
          res.status(404).send({ message: 'Cake not found with id ' + _id });
        }
      })
      .catch((err) => {
        res.status(500).send({ message: 'Error deleting cake with id ' + _id });
      });
  } else {
    res.send('Invalid apiKey, please read the documentation.');
  }
};
