const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const GitHubStrategy = require('passport-github2').Strategy;

const dotenv = require('dotenv');

dotenv.load();

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

  passport.use('google', new GoogleStrategy({
    clientID: process.env.GMAIL_ID,
    clientSecret: process.env.GMAIL_SECRET,
    callbackURL: 'http://localhost:3000/auth/google/callback'
  },
  function (token, refreshToken, profile, done) {
    process.nextTick(function () {
      User.findOne({ 'google.id': profile.id }, function (err, user) {
        if (err) console.log(err);

        if (user) {
          // if a user is found, log them in
          return done(null, user);
        } else {
          var newUser = new User();

          newUser.google.id = profile.id;
          newUser.google.token = token;
          newUser.google.name = profile.displayName;
          newUser.google.email = profile.emails[0].value; // pull the first email

          // save the user
          newUser.save(function (err) {
            if (err) throw err;
            return done(null, newUser);
          });
        }
      });
    });
  }));

  passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_ID,
    clientSecret: process.env.GITHUB_SECRET,
    callbackURL: 'http://localhost:3000/auth/github/callback'
  },
  function (accessToken, refreshToken, profile, done) {
    process.nextTick(function () {
      User.findOne({ githubId: profile.id }, function (err, user) {
        if (err) console.log(err);

        if (user) {
          return done(null, user);
        } else {
          var newUser = new User();

          if (profile._json.email) {
            newUser.github.email = profile._json.email;
          }
          newUser.github.id = profile._json.id;
          newUser.github.name = profile._json.name;
          newUser.github.token = accessToken;

          // save the user
          newUser.save(function (err) {
            if (err) return done(err);
            return done(null, newUser);
          });
        }
      });
    });
  }
));
}; // end module
