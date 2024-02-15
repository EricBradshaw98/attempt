const express = require('express');
const router  = express.Router();
const userQueries = require('../db/queries/users')

router.get("/", async (req, res) => {
  try {
    // Fetch user data or perform any necessary operations
    const user = req.user; // Assuming you have user data available in the request object

    // Render the template that includes the header
    res.render("_header", { user:user.rows });
  } catch (error) {
    console.error("Error in route handler:", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
