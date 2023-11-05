const routes = require('express').Router();
const user = require('./user');
const { ensureAuth, ensureGuest } = require('../middleware/auth');
const axios = require('axios');

routes.use('/', require('./swagger'));
routes.use('/users', user);
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
    const users = response.data;
    const adminUsers = users.filter(user => user.googleId);
    const allUsers = users.filter(user => user.username);

    res.render('dashboard', {
      name: req.user.firstName,
      adminUsers,
      allUsers
    });
  } catch (err) {
    console.error(err);
    res.render('error/500');
  }
});

module.exports = routes;
