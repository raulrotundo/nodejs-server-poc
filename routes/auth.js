var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

var data = require('../mock/db.json');

router.post('/', (req, res) => {
  // Fake response time
  setTimeout(function () {
    // find if any user matches login credentials
    var filteredUsers = data.users.filter(user => {
      return user.username === req.body.username && user.password === req.body.password;
    });

    if (filteredUsers.length) {
      // if login details are valid return 200 OK with user details and fake jwt token
      var user = filteredUsers[0];
      var token = jwt.sign({
        id: user.id,
        name: user.name,
        username: user.username,
        email: user.email,
        address: user.address,
        phone: user.phone,
        website: user.website,
      }, process.env.JWT_SECRET_KEY);
      res.json({ token });
    } else {
      // else return 400 bad request
      res.status(400).json({ errors: { msg: 'Username or password is incorrect' } });
    }
  }, 1000);
});

module.exports = router;
