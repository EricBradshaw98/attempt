const express = require('express');
const router  = express.Router();
const userQueries = require('../db/queries/users');




router.get("/", (req, res) => {

  req.session = null;

  res.redirect(`/login`);
});

router.post("/", (req, res) => {

  req.session = null;

  res.redirect(`/login`);
});
//==============================================================================
module.exports = router;
