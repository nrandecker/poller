const LocalStrategy = require('passport-local').Strategy;

// load up the user model
const User = require('../models/user');

module.exports = function (passport) {
  passport.use('local-signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback : true
  },
  function (req, email, password, done) {
    process.nextTick(function () {
      User.findOne({ 'local.email' : email }, function (err, user) {
        if (err) return done(err);

        if (user) {
          return done(err);
        } else {
          var newUser = new User();

          newUser.local.email = email;
          newUser.local.password = newUser.generateHash(password);
          newUser.local.firstName = req.body.firstName;
          newUser.local.lastName = req.body.lastName;

          // save the user
          newUser.save(function (err) {
            if (err) return done(err);
            return done(null, newUser);
          });
        } // end else
      });
    });
  }));

  passport.use('local-login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback : true
  }, function (req, email, password, done) {
    User.findOne({ 'local.email' : email }, function (err, user) {
      if (err) return done(err);

      if (!user) return done(err);

      if (!user.validPassword(password)) return done(err);

      return done(null, user);
    });
  }));
}; // end module
