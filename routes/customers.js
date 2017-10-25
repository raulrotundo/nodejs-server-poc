var express = require('express');
var router = express.Router();
var VerifyToken = require('../middlewares/VerifyToken');
var Customers = require('../models/customers');

// Get all customers
router.get('/', VerifyToken, (req, res, next) => {
  // Access the provided 'page' and 'items_per_page' query parameters  
  var items_per_page = Number(req.query.items_per_page) || 10;
  var page = req.query.page > 0 ? ((req.query.page - 1) * items_per_page) : 0;

  Customers.find({}, {}, { skip: page, limit: items_per_page }, function (err, customers) {
    if (err) res.status(500).json(err);

    res.status(200).json({
      total: customers.length,
      page: page,
      items_per_page: items_per_page,
      data: customers
    });
  });
});

module.exports = router;