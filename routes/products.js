var express = require('express');
var router = express.Router();
var VerifyToken = require('../middlewares/VerifyToken');
var Products = require('../models/products');

/**
 * Get all products
 * API /api/products
 * 
 * @param string items_per_page -> Limit of items per page to be displayed
 * @param string page -> Number of page to be displayed
 * @param string q -> Query condition
 */
router.get('/', VerifyToken, (req, res, next) => {
  var limit = Number(req.query.items_per_page) || 10;
  var offset = req.query.page > 0 ? ((req.query.page - 1) * limit) : 0;
  var query = req.query.q ? { name: new RegExp(req.query.q, 'i') } : {};

  Products.find(query, (err, products) => {
    if (err) res.status(500).json(err);

    var data = products.slice(offset, limit + offset);
    var total_pages = Math.ceil(products.length / limit);

    res.status(200).json({
      total_pages: total_pages,
      total_rows: products.length,
      page: req.query.page,
      items_per_page: limit,
      data: data
    });
  });
});

module.exports = router;