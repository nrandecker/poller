const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const GitHubStrategy = require('passport-github2').Strategy;

const dotenv = require('dotenv');

dotenv.load();

// load up the user model
const User = require('../models/user');

module.exports = function passportStrategies(passport) {
  // used to serialize the user for the session
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

   // used to deserialize the user
  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });

  passport.use('local-signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true,
  },
  (req, email, password, done) => {
    process.nextTick(() => {
      User.findOne({ 'local.email': email }, (err, user) => {
        if (err) return done(err);

        if (user) {
          return done(err);
        }
        const newUser = new User();

        newUser.local.email = email;
        newUser.local.password = newUser.generateHash(password);
        newUser.local.firstName = req.body.firstName;
        newUser.local.lastName = req.body.lastName;

          // save the user
        newUser.save((error) => {
          if (error) console.log(error);
          return done(null, newUser);
        });
         // end else
      });
    });
  }));

  passport.use('local-login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true,
  }, (req, email, password, done) => {
    process.nextTick(() => {
      User.findOne({ 'local.email': email }, '+local.password', (err, user) => {
        if (err) return done(err);

        if (!user) return done(err);


        if (!user.validPassword(password, user.local.password)) {
          return done(err);
        }

        return done(null, user);
      });
    });
  }));

  passport.use('google', new GoogleStrategy({
    clientID: process.env.GMAIL_ID,
    clientSecret: process.env.GMAIL_SECRET,
    callbackURL: 'https://poller-nrandecker.herokuapp.com/auth/google/callback',
  },
  (token, refreshToken, profile, done) => {
    process.nextTick(() => {
      User.findOne({ 'google.id': profile.id }, (err, user) => {
        if (err) console.log(err);

        if (user) {
          // if a user is found, log them in
          return done(null, user);
        }
        const newUser = new User();

        newUser.google.id = profile.id;
        newUser.google.token = token;
        newUser.google.name = profile.displayName;
        newUser.google.email = profile.emails[0].value; // pull the first email

          // save the user
        newUser.save(() => {
          if (err) throw err;
          return done(null, newUser);
        });
      });
    });
  }));

  passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_ID,
    clientSecret: process.env.GITHUB_SECRET,
    callbackURL: 'https://poller-nrandecker.herokuapp.com/auth/github/callback',
  },
  (accessToken, refreshToken, profile, done) => {
    process.nextTick(() => {
      User.findOne({ 'github.id': profile.id }, (err, user) => {
        if (err) console.log(err);

        if (user) {
          return done(null, user);
        }
        const newUser = new User();

        if (profile._json.email) {
          newUser.github.email = profile._json.email;
        }
        newUser.github.id = profile._json.id;
        newUser.github.name = profile._json.name;
        newUser.github.token = accessToken;

          // save the user
        newUser.save(() => {
          if (err) return done(err);
          return done(null, newUser);
        });
      });
    });
  }));
}; // end module
