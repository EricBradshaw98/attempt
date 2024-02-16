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
    console.log('orderID', orderID)
    // Pass user object to the menu template
    res.render('menu', { user, menuItems: menuItems.rows, orderID });
  } catch (error) {
    console.error("Error fetching user and menu items:", error);
    res.status(500).send("Internal Server Error");
  }
});






router.post('/cart', async (req, res) => {
  try {
    // Extract necessary data from the request body
    const { orderID, menuItemID, quantity } = req.body;


    await userQueries.insertOrderedItems(orderID, menuItemID, quantity);


    console.log('Item added to the ordered_items database table successfully');


    res.status(200).send('Item added to the ordered_items database table successfully');
  } catch (error) {

    console.error('Error adding item to the ordered_items database table:', error);


    res.status(500).send('Error adding item to the ordered_items database table. Please try again later.');
  }
});






module.exports = router;
