const express = require('express');
const router  = express.Router();
const db = require('../db/connection')
const { Template } = require('ejs')
const userQueries = require('../db/queries/users')
// const client = require('./twilio-api')


router.get("/", async (req, res) => {
  try {
    const userId = req.session.user_id;

    const { orderID, menuItemID, quantity } = req.body;
    // Fetch user data
    const user = await userQueries.getUserById(userId);

    if (!user) {
      res.status(404).send("User not found");
      return;
    }

    // Assuming userQueries.queryAllFoodItems() returns a promise


    const menuItems = await userQueries.getCart(userId);

    const subtotal = await userQueries.getSubtotal(menuItems);

    // Pass user object to the menu template
    res.render('cart', { subtotal, user, menuItems: menuItems.rows, orderID });
  } catch (error) {
    console.error("Error fetching user and menu items:", error);
    res.status(500).send("Internal Server Error");
  }
});


router.get("/:id", async (req, res) => {
  try {
    const userId = req.session.user_id;
    const orderID = req.params.id;

    //const { orderID, menuItemID, quantity } = req.body;
    // Fetch user data
    const user = await userQueries.getUserById(userId);

    if (!user) {
      res.status(404).send("User not found");
      return;
    }

    // Assuming userQueries.queryAllFoodItems() returns a promise


    const menuItems = await userQueries.orderedItemsByOrderID(orderID);
console.log(menuItems)
    const subtotal = await userQueries.getSubtotal(orderID);
    console.log(subtotal)
    // Pass user object to the menu template
    res.render('cart', { subtotal, user, menuItems, orderID });
  } catch (error) {
    console.error("Error fetching user and menu items:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.post('/:id', async (req, res) => {
  try {
    // Extract necessary data from the request body
    const userId = req.session.user_id;
    const orderID = req.params.id;

    const user = await userQueries.getUserById(userId);

    if (!user) {
      res.status(404).send("User not found");
      return;
    }

    // Assuming userQueries.queryAllFoodItems() returns a promise

    const menuItems = await userQueries.orderedItemsByOrderID(orderID);
    console.log(menuItems)
    const subtotal = await userQueries.getSubtotal(orderID);
    console.log(subtotal)
    // Pass user object to the menu template
    res.redirect(`/${orderID}`);
  } catch (error) {
    console.error("Error fetching user and menu items:", error);
    res.status(500).send("Internal Server Error");
  }
});


router.post('/', async (req, res) => {
  try {
    // Extract necessary data from the request body
    const { orderID, menuItemID, quantity } = req.body;
console.log(orderID, menuItemID, quantity)

    await userQueries.insertOrderedItems(orderID, menuItemID, quantity);


    console.log('Item added to the ordered_items database table successfully');


    res.status(200).send('Item added to the ordered_items database table successfully');
  } catch (error) {

    console.error('Error adding item to the ordered_items database table:', error);


    res.status(500).send('Error adding item to the ordered_items database table. Please try again later.');
  }
});




module.exports = router;

