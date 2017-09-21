var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');

var Users = require('../models/users');

router.post('/', (req, res) => {

  // find the user
  Users.findOne({ username: req.body.username }, function handleQuery(error, user) {

    if (error) {
      res.status(500).json({
        errors: {
          msg: 'Internal server error.'
        }
      });
      throw error;
    }

    if (!user) {
      res.status(401).json({
        errors: {
          msg: 'Authentication failed. User not found.'
        }
      });
      return;
    }

    bcrypt.compare(req.body.password, user.password, function (error, result) {

      if (error) {
        res.status(500).json({
          errors: {
            msg: 'Internal server error.'
          }
        });
        throw error;
      }

      if (!result) {
        res.status(401).json({
          errors: {
            msg: 'Authentication failed. Wrong password.'
          }
        });
        return;
      }

      // if user is found and password is right then, create a token
      var token = jwt.sign({
        id: user.id,
        name: user.name,
        username: user.username,
        email: user.email,
        role: user.role
      }, process.env.JWT_SECRET_KEY, {
          expiresIn: process.env.JWT_EXPIRES_IN
        }
      );

      // return the information including token as JSON
      res.status(200).json({ token });
    });
  });
});

module.exports = router;
