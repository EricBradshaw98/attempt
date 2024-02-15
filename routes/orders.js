const express = require('express');
const router  = express.Router();
const userQueries = require('../db/queries/users');

router.post('/', (req, res) => {

  console.log(req.body)
  userQueries.createNewOrderQuery(req.body.userID)
    .then(order => {
      res.json({ order });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

module.exports = router;
