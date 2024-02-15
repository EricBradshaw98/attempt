const express = require('express');
const router  = express.Router();
const userQueries = require('../db/queries/users');

router.get("/login", async (req, res) => {
  try {
    const userId = req.session.user_id;
    // Assuming userQueries.getUserById(userId) fetches user data from the database
    const user = await userQueries.getUsers(userId);


    if (user) {
      const templateVars = {
        user,
      };
      res.render("login", templateVars);
    } else {

    }
  } catch (error) {

    console.error("Error in login route:", error);
    res.status(500).send("Internal Server Error");
  }
});
//==============================================================================
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).send("Input email and password");
    return;
  }

  try {
    // Fetch user from the database based on the provided email
    const user = await userQueries.getUserByEmail(email);

    if (user) {
      // Compare passwords stored in plain text
      if (password === user.password && user.status === 'customer') {
        // Passwords match, set user_id in session and redirect to menu
        req.session.user_id = user.id;
        res.redirect("/menu");
        return;

      } if (password === user.password && user.status === 'admin') {
        // Passwords match, set user_id in session and redirect to menu
        req.session.user_id = user.id;
        res.redirect("/admin");
        return;
      } else {
        // Passwords don't match
        res.status(403).send("Email and password don't match.");
        return;
      }
    } else {
      // User not found
      res.status(404).send("User not found.");
      return;
    }
  } catch (error) {
    console.error("Error in login route:", error);
    res.status(500).send("Internal Server Error");
    return;
  }
});
//==============================================================================
module.exports = router;

