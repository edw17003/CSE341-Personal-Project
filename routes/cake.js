const routes = require('express').Router();
const cakes = require('../controllers/cake.js');

routes.get('/', cakes.getAllCakes);
routes.get('/:_id', cakes.getCakeById);
routes.post('/', cakes.createCake);
routes.put('/:_id', cakes.updateCake);
routes.delete('/:_id', cakes.deleteCake);

module.exports = routes;
