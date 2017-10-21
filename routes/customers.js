var express = require('express');
var router = express.Router();
var VerifyToken = require('../middlewares/VerifyToken');
var Customers = require('../models/customers');

// Get all customers
router.get('/', VerifyToken, (req, res, next) => {
  Customers.find({}, function (err, customers) {
    if (err) res.status(500).json(err);

    res.status(200).json({
      data: customers
    });
  });
});

module.exports = router;