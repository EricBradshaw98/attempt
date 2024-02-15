const express = require('express');
const router = express.Router();
const db = require('../db/connection');
const { Template } = require('ejs');
const userQueries = require('../db/queries/users');
// const client = require('./twilio-api');




// ADMIN ORDERS
router.get('/', async (req, res) => {
  try {
    const userId = req.session.user_id;
    const user = await userQueries.getUserById(userId);
    const orderData = await userQueries.getOrdersAdmin();

    const ordersWithItems = await Promise.all(orderData.map(async (order) => {
      const itemData = await userQueries.orderItemContentsQuery(order.id);
      order.items = itemData;
      return order;
    }));

    let orderID;
    for (const order of ordersWithItems) {
      if (order.status === 'In Progress') {
        orderID = order.id;
        break; // Exit loop once the first order with 'In Progress' status is found
      }
    }

    res.render('admin', { user, orders: ordersWithItems, orderID });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;

