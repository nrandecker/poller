const express = require('express');
const debug = require('debug')('app:server');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const dotenv = require('dotenv');
const webpack = require('webpack');
const passport = require('passport');
const jwt = require('jwt-simple');
const moment = require('moment');
const bodyParser = require('body-parser');
const webpackConfig = require('../config/webpack.config');
const project = require('../config/project.config');
const compress = require('compression');
const shortid = require('shortid');

dotenv.load();
const app = express();

mongoose.connect(process.env.MONGO_DB);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to db');
});

// load up the user model
const User = require('./models/user');

// Apply gzip compression
app.use(compress());
app.use(cors());
app.use(passport.initialize());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

require('./config/passport')(passport);


app.use(passport.initialize());

function createToken(user) {
  const payload = {
    exp: moment().add(14, 'days').unix(),
    iat: moment().unix(),
    sub: user._id,
  };
  return jwt.encode(payload, process.env.TOKEN_SECRET);
}

function authenticate(token, cb) {
  const payload = jwt.decode(token, process.env.TOKEN_SECRET);
  const now = moment().unix();

  if (now > payload.exp) {
    cb({ message: 'Token has expired.' });
  }

  const promise = User.findById(payload.sub).exec();

  promise.then((user) => {
    return cb(user);
  })
  .catch((err) => {
    return cb(err);
  });
}

app.post('/api/newPoll', (req, res) => {
  if (!(req.headers && req.headers.authorization)) {
    return res.status(400).send({ message: 'You did not provide a JSON Web Token in the Authorization header.' });
  }

  authenticate(req.headers.authorization, (user, err) => {
    if (err) return res.status(400).send({ message: err });

    let newUser = user;

    const pollOptions = req.body.data.options.filter((option) => {
      if (option.text) {
        return option;
      }
    });

    newUser.polls = newUser.polls.concat({
      id: shortid.generate(),
      title: req.body.data.title,
      options: pollOptions,
      created: new Date(),
    });

    newUser.save((err) => {
      if (err) console.log(err);
      return res.send({ poll: newUser.polls });
    });
  });
});

app.get('/api/getPoll/:id', (req, res) => {
  const { id } = req.params;
  const promise = User.findOne({ 'polls.id': id }).select('polls').exec();

  promise.then((result) => {
    const { polls } = result;
    const requestedPoll = polls.filter((poll) => {
      if (poll.id === id) {
        return poll;
      }
    });

    return res.send({ poll: requestedPoll });
  }).catch((err) => {
    if (err) {
      return res.send({ success: false, message: 'Ah, Snap something went wrong!' });
    }
  });
});

app.post('/api/vote', (req, res) => {
  const { id } = req.body;
  const promise = User.findOne({ 'polls.id': id }).select('polls').exec();

  promise.then((result) => {
    const { polls } = result;
    const requestedPoll = polls.filter((poll) => {
      if (poll.id === id) {
        return poll;
      }
    });

    const options = requestedPoll[0].options;
    let updatedPoll = options.map((option) => {
      if (option.text === req.body.option) {
        option.votes = option.votes + 1;
      }
      return option;
    });
    result.save((err) => {
      if (err) console.log(err);
      return res.send({ poll: updatedPoll });
    });
  }).catch((err) => {
    if (err) {
      console.log(err);
    }
  });
});

app.get('/api/polls', (req, res) => {
  const promise = User.find().select('polls').limit(25).exec();

  promise.then((result) => {
    let polls = result.map((poll) => {
      return poll.polls;
    });
    return res.send({ polls });
  })
  .catch((err) => {
    if (err) {
      console.log(err);
    }
  });
});

app.post('/auth/authenticate', (req, res, next) => {
  if (!(req.headers && req.headers.authorization)) {
    return res.status(400).send({ message: 'You did not provide a JSON Web Token in the Authorization header.' });
  }

  const source = req.body.source;

  if (source === 'local') {
    const token = req.headers.authorization;
    const payload = jwt.decode(token, process.env.TOKEN_SECRET);
    const now = moment().unix();

    if (now > payload.exp) {
      return res.status(401).send({ message: 'Token has expired.' });
    }

    User.findById(payload.sub, (err, user) => {
      if (!user || err) {
        return res.status(400).send({ message: 'User no longer exists.' });
      }

      res.send({ user });
    });
  }
});

app.post('/auth/signup', (req, res, next) => {
  passport.authenticate('local-signup', (err, user) => {
    if (err) return next(res.send({ success: false, message: 'Ah, Snap something went wrong!' }));

    if (!user) {
      return res.status(401).send({ success: false, message: 'Email is already taken.' });
    }

    const token = createToken(user);
    res.send({ token, user });
  })(req, res, next);
});

app.post('/auth/login', (req, res, next) => {
  passport.authenticate('local-login', (err, user) => {
    if (err) return next(res.send({ sucess: false, message: 'Ah, Snap something went wrong!' }));

    if (!user) {
      return res.status(401).send({ success: false, message: 'Username or password is incorrect.' });
    }

    const token = createToken(user);
    res.send({ token, user });
  })(req, res, next);
});

app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/auth/google/callback', (req, res, next) => {
  passport.authenticate('google', (err, user) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.redirect('http://localhost:3000');
    }

    res.writeHead(302, {
      Location: `/signup?token=${user.google.token}`,
    });
    res.end();
  })(req, res, next);
});

app.get('/auth/github', passport.authenticate('github', { scope: ['user:email'] }));

app.get('/auth/github/callback', (req, res, next) => {
  passport.authenticate('github', (err, user) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.redirect('http://localhost:3000');
    }

    res.writeHead(302, {
      Location: `/signup?token=${user.github.token}`,
    });
    res.end();
  })(req, res, next);
});

// ------------------------------------
// Apply Webpack HMR Middleware
// ------------------------------------
if (project.env === 'development') {
  const compiler = webpack(webpackConfig);

  debug('Enabling webpack dev and HMR middleware');
  app.use(require('webpack-dev-middleware')(compiler, {
    publicPath: webpackConfig.output.publicPath,
    contentBase: project.paths.client(),
    hot: true,
    quiet: project.compiler_quiet,
    noInfo: project.compiler_quiet,
    lazy: false,
    stats: project.compiler_stats,
  }));
  app.use(require('webpack-hot-middleware')(compiler, {
    path: '/__webpack_hmr',
  }));

  // Serve static assets from ~/public since Webpack is unaware of
  // these files. This middleware doesn't need to be enabled outside
  // of development since this directory will be copied into ~/dist
  // when the application is compiled.
  app.use(express.static(project.paths.public()));

  // This rewrites all routes requests to the root /index.html file
  // (ignoring file requests). If you want to implement universal
  // rendering, you'll want to remove this middleware.
  app.use('*', (req, res, next) => {
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
    'section in the README for more information on deployment strategies.');

  // Serving ~/dist by default. Ideally these files should be served by
  // the web server and not the app server, but this helps to demo the
  // server in production.
  app.use(express.static(project.paths.dist()));
}

module.exports = app;
