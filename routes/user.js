const routes = require('express').Router();
const users = require('../controllers/user.js');

routes.get('/', users.findAll);
routes.get('/:_id', users.findOne);
routes.post('/', users.create);
routes.put('/:_id', users.updateOne);
routes.delete('/:_id', users.deleteOne);

module.exports = routes;
