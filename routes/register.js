const express = require('express');
const router  = express.Router();
const userQueries = require('../db/queries/users');

router.get("/register", (req, res) => {
  const userId = req.session.user_id;

  const user = userQueries.getUsers(userId);

  const templateVars = {
    user,
  };
  res.render("register", templateVars);
});

router.post("/register", async (req, res) => {
  const { email, password, phone } = req.body;

  if (!email || !password) {
    res.status(400).send("Input email and password");
    return;
  }

  try {
    // Check if the email is already in use
    const existingUser = await userQueries.getUserByEmail(email);
    if (existingUser) {
      res.status(400).send("Email in use");
      return;
    }

    // Generate a unique userId
    const userId = userQueries.generateRandomString(3);

    const customerStatus = "customer";


    // Create a new user object
    const newUser = {
      id: userId,
      name: email.substring(0, email.indexOf('@')), // Extracting name from email
      email,
      password: password,
      status: customerStatus,
      phone: phone
    };

    // Insert the new user into the database
    await userQueries.createUser(newUser);

    // Set the user_id in the session
    req.session.user_id = userId;

    res.redirect(`/login`);
  } catch (error) {
    console.error("Error in register route:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/redirectregister", (req, res) => {
  const userId = req.session.user_id;
  const user = userQueries.getUsers(userId);
  if (user) {
    res.redirect(`/register`);
  } else {
    res.redirect(`/register`);
  }
});

router.post("/redirectlogin", (req, res) => {
  const userId = req.session.user_id;
  const user = userQueries.getUsers(userId);
  if (user) {
    res.redirect(`/login`);
  } else {
    res.redirect(`/login`);
  }
});


module.exports = router;
