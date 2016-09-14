var User        = require('./controllers/user.server.controller'),
    jwt         = require('jsonwebtoken'),
    secrets     = require('../config/secrets'),
    verifyToken = require('../config/tokenMiddleware');

module.exports = function(app) {

  app.get('/api', verifyToken,  User.welcome);

  app.post('/api/login',    User.authenticateUserByEmail);
  app.post('/api/register', User.registerUser);

};
