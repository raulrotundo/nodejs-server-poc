var express = require('express');
var router = express.Router();
var VerifyToken = require('../middlewares/VerifyToken');
var Products = require('../models/products');

// Get all products
router.get('/', VerifyToken, (req, res, next) => {
  Products.find({}, function (err, products) {
    if (err) res.status(500).json(err);

    res.status(200).json({
      data: products
    });
  });
});

module.exports = router;