const express = require('express');
const debug = require('debug')('app:server');
const path = require('path');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const webpack = require('webpack');
const passport = require('passport');
const jwt = require('jwt-simple');
const moment = require('moment');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const webpackConfig = require('../config/webpack.config');
const project = require('../config/project.config');
const compress = require('compression');
const session = require('express-session');

dotenv.load();
const app = express();

mongoose.connect(process.env.MONGO_DB);

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  console.log('Connected to db');
});

var allowCrossDomain = function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.send(200);
  } else {
    next();
  }
};

// Apply gzip compression
app.use(compress());
app.use(passport.initialize());
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(allowCrossDomain);
app.use(bodyParser.urlencoded({ extended: false }));

require('./config/passport')(passport);
app.use(session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

app.post('/auth/signup', function (req, res, next) {
  passport.authenticate('local-signup', function (err, user) {
    if (err) return next(res.send({ success: false, message: 'Ah, Snap something went wrong!' }));

    if (!user) {
      return res.status(401).send({ success: false, message: 'Email is already taken.' });
    }

    var token = createToken(user);
    res.send({ token: token, user: user });
  })(req, res, next);
});

app.post('/auth/login', function (req, res, next) {
  passport.authenticate('local-login', function (err, user) {
    if (err) return next(res.send({ sucess: false, message: 'Ah, Snap something went wrong!' }));

    if (!user) {
      return res.status(401).send({ success: false, message: 'Username or password is incorrect.' });
    }

    delete user.password;
    var token = createToken(user);
    res.send({ token: token, user: user });
  })(req, res, next);
});

app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

app.get('/auth/google/callback', function (req, res, next) {
  passport.authenticate('google', function (err, user) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.redirect('http://localhost:3000');
    }

    res.writeHead(302, {
      'Location': '/signup?token=' + user.google.token
    });
    res.end();
  })(req, res, next);
});

app.get('/auth/github', passport.authenticate('github', { scope: ['user:email'] }));

app.get('/auth/github/callback', function (req, res, next) {
  passport.authenticate('github', function (err, user) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.redirect('http://localhost:3000');
    }

    res.writeHead(302, {
      'Location': '/signup?token=' + user.github.token
    });
    res.end();
  })(req, res, next);
});

function createToken (user) {
  var payload = {
    exp: moment().add(14, 'days').unix(),
    iat: moment().unix(),
    sub: user._id
  };
  return jwt.encode(payload, process.env.TOKEN_SECRET);
}

// ------------------------------------
// Apply Webpack HMR Middleware
// ------------------------------------
if (project.env === 'development') {
  const compiler = webpack(webpackConfig);

  debug('Enabling webpack dev and HMR middleware');
  app.use(require('webpack-dev-middleware')(compiler, {
    publicPath  : webpackConfig.output.publicPath,
    contentBase : project.paths.client(),
    hot         : true,
    quiet       : project.compiler_quiet,
    noInfo      : project.compiler_quiet,
    lazy        : false,
    stats       : project.compiler_stats
  }));
  app.use(require('webpack-hot-middleware')(compiler, {
    path: '/__webpack_hmr'
  }));

  // Serve static assets from ~/public since Webpack is unaware of
  // these files. This middleware doesn't need to be enabled outside
  // of development since this directory will be copied into ~/dist
  // when the application is compiled.
  app.use(express.static(project.paths.public()));

  // This rewrites all routes requests to the root /index.html file
  // (ignoring file requests). If you want to implement universal
  // rendering, you'll want to remove this middleware.
  app.use('*', function (req, res, next) {
    const filename = path.join(compiler.outputPath, 'index.html');
    compiler.outputFileSystem.readFile(filename, (err, result) => {
      if (err) {
        return next(err);
      }
      res.set('content-type', 'text/html');
      res.send(result);
      res.end();
    });
  });
} else {
  debug(
    'Server is being run outside of live development mode, meaning it will ' +
    'only serve the compiled application bundle in ~/dist. Generally you ' +
    'do not need an application server for this and can instead use a web ' +
    'server such as nginx to serve your static files. See the "deployment" ' +
    'section in the README for more information on deployment strategies.'
  );

  // Serving ~/dist by default. Ideally these files should be served by
  // the web server and not the app server, but this helps to demo the
  // server in production.
  app.use(express.static(project.paths.dist()));
}

module.exports = app;
