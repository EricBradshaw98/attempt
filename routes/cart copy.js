const express = require('express');
const router  = express.Router();
const db = require('../db/connection')
const { Template } = require('ejs')
const userQueries = require('../db/queries/users')
// const client = require('./twilio-api')
const { getAllFoodItems } = require("../db/queries/menu");

//get for viewing

router.get('/', (req, res) => {
  let templateVars = {};
  const userID = req.cookies.customer_id || 1;

  userQueries.getCart(userID)
  .then((data) => {
    const orderID = data.rows[0].id;
    templateVars.orderID = orderID;
    return userQueries.getOrders(orderID)
  })
  .then((data) => {
    templateVars.menuItems = data;
    return userQueries.getSubtotal(templateVars.orderID);
  })
  .then((data) => {
    //undefined
    if (!data) {
      templateVars.subtotal = 0;

    } else {
      templateVars.subtotal = data.reduce((prev, curr) => {
        return Number(curr.subtotal) + prev;
      }, 0);
      templateVars.subtotal = templateVars.subtotal.toFixed(2);
      res.render('cart', templateVars)
    }
  })
  .catch((err) => {
    res.send(err);
  })
})

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

//remove item

router.post('/removeFoodItem/:orderID', (req, res) => {
  const orderID = req.params.orderID;
  const foodItemName = req.body.foodItemName;
  userQueries.removeFoodItem(foodItemName, orderID)
    .then(() => {
      res.redirect(`/cart`);
    })
    .catch((err) => {
      res.send(err);
    });
});

// submit the order
router.post('/submitOrder/:orderID', (req, res) => {
  const orderID = req.params.orderID;
  userQueries.submitOrder(orderID)
    .then(() => {
      userQueries.getOwnerPhone()
        .then((phoneNumber) => {
          //
          // client.messages
          //   .create({
          //     body: `Please check the new order: ${orderID}, please check Food Delivery App for details.`,
          //     to: phoneNumber, // Text customer number
          //     from: '+twilio', // Twilio number
          //   })
            // .then((message) => {
            //   console.log(message.sid);
            //   console.log(message.body);
            // })
            // .catch((err) => console.log(err));
          res.redirect('/orders');
        });
    })
    .catch((err) => {
      res.send(err);
    });
});


// add an item
router.post('/:orderID', (req, res) => {

  const foodItemID = req.body.foodItemID;
  const quantity = req.body.quantity;
  const orderID = req.params.orderID;



  userQueries.searchCart(orderID, foodItemID)
    .then((data) => {
      if (data.length === 0) {
        // not already in cart
        userQueries.addToCart(orderID, foodItemID, quantity)
          .then(() => res.redirect('/'));
      }
      if (data.length > 0) {
        //already in cart
        userQueries.updateCart(quantity, orderID, foodItemID)
          .then(() => res.redirect('/'));
      }
    });
});


// adjust the quantity
router.post('/updateQuantity/:orderID', (req, res) => {
  const newQuantity = req.body.quantity;
  const orderContentId = req.body.order_contents_id;

  userQueries.updateQuantity(newQuantity, orderContentId)
    .then(() => {
      res.redirect(`/cart`);
    })
    .catch((err) => {
      res.send(err);
    });
});



module.exports = router;
