var jwt        = require('jsonwebtoken'),
    secrets    = require('./secrets');


/**
Mitigation against XSS
=====================
If a script is injected to steal the id_token from local storage,
the attacker/thief will not be able to use it for subsequent requests because the server on every requests
verifies the JWT with the sessionSecret with this token middleware.
**/

/**
Mitigation against CSRF
=======================
CSRF attack is not possible because we are not storing the JWT as cookies.
**/
module.exports = function(req, res, next){
  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  if(token) {
    // verifies secret and checks exp
    jwt.verify(token, secrets.sessionSecret, function(err, decoded) {
      if(err) {
        return res.json({ message: 'Unauthorized Access. Token has been tampered with!'});
      } else {
        // if everything is good, save to request for use in other routes
        console.log("Decoded Payload: ", decoded);
        req.decoded = decoded;
        next();
      }
    });
  } else {
      // if there is no token return an error
      return res.status(403).json({
          message: 'Unauthorized Access'
      });
    }
};