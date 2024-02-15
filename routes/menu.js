const express = require('express');
const router  = express.Router();
const userQueries = require('../db/queries/users')

router.get("/", async (req, res) => {
  try {
    const userId = req.session.user_id;
    const orderID = req.session.order_id;

    // Fetch user data
    const user = await userQueries.getUserById(userId);

    if (!user) {
      res.status(404).send("User not found");
      return;
    }

    // Assuming userQueries.queryAllFoodItems() returns a promise
    const menuItems = await userQueries.queryAllFoodItems();

    // Pass user object to the menu template
    res.render('menu', { user, menuItems: menuItems.rows });
  } catch (error) {
    console.error("Error fetching user and menu items:", error);
    res.status(500).send("Internal Server Error");
  }
});


router.post('/:id', async (req, res) => {
  console.log('req.body:', req.params.id);
})




module.exports = router;
