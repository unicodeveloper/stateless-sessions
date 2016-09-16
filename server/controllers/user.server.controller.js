 var  jwt         = require('jsonwebtoken'),
      secrets     = require('../../config/secrets');

module.exports = {
  /**
   * Welcome Notice
   * @param  req
   * @param  res
   * @return Void
   */
  welcome: function(req, res){
    return res.status(200).json({ message: 'Welcome to JWT Handbook Api'});
  },

  accessCheckOut: function(req, res) {
    return res.status(200).json({
      message: 'Welcome to the JWT Handbook Checkout Page, Items purchased by ' + req.decoded.email,
      items: req.decoded.items
    });
  },

  /**
   * Add to Cart
   * @param  req
   * @param  res
   * @return Void
   */
  addToCart: function(req, res) {
    var email = req.body.email;
    var shirts = req.body.shirt;
    var bags = req.body.bag;
    var shoes = req.body.shoe;
    var iphone = req.body.iphone;

    /* Payload has 5 claims*/
    var currUser = {
      sub: "User Details",
      email: email,
      items: {
        shirts: shirts,
        bags: bags,
        shoes: shoes,
        iphone: iphone
      }
    };

    // Signs with HS256 algorithm by default, so we don't need to explicitly define it
    var token = jwt.sign(currUser, secrets.sessionSecret, { expiresIn: 86400 });

    return res.json({
      success: true,
      user: currUser,
      token: token
    });
  }
};