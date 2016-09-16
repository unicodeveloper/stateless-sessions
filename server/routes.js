var User        = require('./controllers/user.server.controller'),
    jwt         = require('jsonwebtoken'),
    secrets     = require('../config/secrets'),
    verifyToken = require('../config/tokenMiddleware');

module.exports = function(app) {
  app.post('/api/cart',    User.addToCart);
  app.get('/api/checkout', verifyToken, User.accessCheckOut);
};
