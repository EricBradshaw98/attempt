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
console.log(orderID)
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

router.post('/removeFoodItem/:id', async (req, res) => {
  try {
    const orderID = req.params.id;
    const foodItemName = req.body.foodItemName;
    console.log(orderID)
    console.log(foodItemName)


    // Remove a food item from the order
    await userQueries.removeFoodItem(foodItemName, orderID);

    res.redirect(`/cart`);
  } catch (error) {
    console.error('Error removing food item from the order:', error);
    res.status(500).send('Error removing food item from the order. Please try again later.');
  }
});



// delete order inside
router.post('/cancelOrder/:orderID', (req, res) => {
  const orderID = req.params.orderID;
  userQueries.cancelCartOrder(orderID)
    .then(() => {
      res.redirect(`/`);
    })
    .catch((err) => {
      res.send(err);
    });
});

module.exports = router;

