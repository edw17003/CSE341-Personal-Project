const routes = require('express').Router();
const user = require('./user');
const cake = require('./cake');
const { ensureAuth, ensureGuest } = require('../middleware/auth');
const axios = require('axios');

routes.use('/', require('./swagger'));
routes.use('/users', user);
routes.use('/cakes', cake);
routes.get('/', ensureGuest, (req, res) => {
  res.render('login', {
    layout: 'login',
  });
});

routes.get('/dashboard', ensureAuth, async (req, res) => {
  try {
    const apiUrl = 'https://cse341-personalproject-nnod.onrender.com/users/';
    const headers = {
      'Accept': 'application/json',
      'apiKey': 'Ezl0961tEpx2UxTZ5v2uKFK91qdNAr5npRlMT1zLcE3Mg68Xwaj3N8Dyp1R8IvFenrVwHRllOUxF0Og00l0m9NcaYMtH6Bpgdv7N'
    };

    const response = await axios.get(apiUrl, { headers });
    const allUsers = response.data;

    res.render('dashboard', {
      name: req.user.firstName,
      allUsers
    });
  } catch (err) {
    console.error(err);
    res.render('error/500');
  }
});

module.exports = routes;
