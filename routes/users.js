/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();
const userQueries = require('../db/queries/users');

router.get('/', async (req, res) => {
  try {
    // Assuming userQueries.getAllUsers() fetches all users from the database
    const users = await userQueries.getAllUsers();

    res.render('users', { users });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;

