var express = require('express');
var mongoose = require('mongoose');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var dotenv = require('dotenv');
dotenv.load();

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header("Access-Control-Request-Headers", "*");
  res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Authorization");
  next();
});

mongoose.connect(process.env.MONGODB_URI, {
  useMongoClient: true,
  promiseLibrary: global.Promise
});

var index = require('./routes/index');
var auth = require('./routes/auth');
var products = require('./routes/products');
var customers = require('./routes/customers');

// Index route
app.use('/api', index);
// Authentication routes
app.use('/api/authenticate', auth);
// Product Routes
app.use('/api/products', products);
// Customer Routes
app.use('/api/customers', customers);
// Countries Routes
app.use('/api/countries', countries);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  res.status(err.status || 500).json({
    message: err.message,
    error: err
  });
});

module.exports = app;
