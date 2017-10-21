var jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {

  // check header or url parameters or post parameters for token
  var token = req.headers.authorization.split(' ')[1];
  if (!token)
    return res.status(403).send({
      error: {
        auth: false,
        message: 'No token provided.'
      }
    });

  // verifies secret and checks exp
  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
    if (err)
      return res.status(500).send({
        error: {
          auth: false,
          message: 'Failed to authenticate token.'
        }
      });

    // if everything is good, save to request for use in other routes
    req.userId = decoded.id;
    next();
  });

}

module.exports = verifyToken;