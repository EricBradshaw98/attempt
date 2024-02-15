const express = require('express');
const router  = express.Router();
const db = require('../db/connection')
const { Template } = require('ejs')
const userQueries = require('../db/queries/users')
// const client = require('./twilio-api')


//get for viewing

// router.get('/', (req, res) => {
//   let templateVars = {};
//   const userID = req.cookies.customer_id || 1;

//   userQueries.getCart(userID)
//   .then((data) => {
//     const orderID = data.rows[0].id;
//     templateVars.orderID = orderID;
//     return userQueries.getOrders(orderID)
//   })
//   .then((data) => {
//     templateVars.menuItems = data;
//     return userQueries.getSubtotal(templateVars.orderID);
//   })
//   .then((data) => {
//     //undefined
//     if (!data) {
//       templateVars.subtotal = 0;

//     } else {
//       templateVars.subtotal = data.reduce((prev, curr) => {
//         return Number(curr.subtotal) + prev;
//       }, 0);
//       templateVars.subtotal = templateVars.subtotal.toFixed(2);
//       res.render('cart', templateVars)
//     }
//   })
//   .catch((err) => {
//     res.send(err);
//   })
// })
