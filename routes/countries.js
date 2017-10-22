var express = require('express');
var router = express.Router();
var VerifyToken = require('../middlewares/VerifyToken');
var Countries = require('../models/countries');

// Get all countries list
router.get('/', VerifyToken, (req, res, next) => {
  Countries.find({}, function (err, countries) {
    if (err) res.status(500).json(err);

    res.status(200).json({
      data: countries
    });
  });
});

module.exports = router;