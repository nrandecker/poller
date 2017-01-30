const express = require('express')
const bcrypt = require('bcrypt')
const debug = require('debug')('app:server')
const path = require('path')
const cors = require('cors')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const webpack = require('webpack')
const jwt = require('jwt-simple')
const moment = require('moment')
const bodyParser = require('body-parser')
const passport = require('passport')
const morgan = require('morgan')
const webpackConfig = require('../config/webpack.config')
const project = require('../config/project.config')
const compress = require('compression')

dotenv.load()
const app = express()

var User = mongoose.model('User', new mongoose.Schema({
  email: { type: String, unique: true },
  password: { type: String, select: false },
  firstName: { type: String },
  lastName: { type: String },
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  accessToken: String
}))

mongoose.connect(process.env.MONGO_DB)

// Apply gzip compression
app.use(compress())
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(morgan('combined'))

function createToken (user) {
  var payload = {
    exp: moment().add(14, 'days').unix(),
    iat: moment().unix(),
    sub: user._id
  }

  return jwt.encode(payload, process.env.TOKEN_SECRET)
}

app.post('/auth/signup', function (req, res) {
  User.findOne({ email: req.body.email }, function (err, existingUser) {
    if (existingUser) {
      return res.status(401).send({
        error: {
          email: 'Email is already taken.'
        }
      })
    }
  })

  var user = new User({
    email: req.body.email,
    password: req.body.password,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
  })

  bcrypt.getSalt(10, function (err, salt) {
    bcrypt.hash(user.password, salt, function (err, hash) {
      user.password = hash

      user.save(function () {
        var token = createToken(user)
        res.send({ token: token, user: user })
      })
    })
  })
})

// ------------------------------------
// Apply Webpack HMR Middleware
// ---------------------------p---------
if (project.env === 'development') {
  const compiler = webpack(webpackConfig)

  debug('Enabling webpack dev and HMR middleware')
  app.use(require('webpack-dev-middleware')(compiler, {
    publicPath  : webpackConfig.output.publicPath,
    contentBase : project.paths.client(),
    hot         : true,
    quiet       : project.compiler_quiet,
    noInfo      : project.compiler_quiet,
    lazy        : false,
    stats       : project.compiler_stats
  }))
  app.use(require('webpack-hot-middleware')(compiler, {
    path: '/__webpack_hmr'
  }))

  // Serve static assets from ~/public since Webpack is unaware of
  // these files. This middleware doesn't need to be enabled outside
  // of development since this directory will be copied into ~/dist
  // when the application is compiled.
  app.use(express.static(project.paths.public()))

  // This rewrites all routes requests to the root /index.html file
  // (ignoring file requests). If you want to implement universal
  // rendering, you'll want to remove this middleware.
  app.use('*', function (req, res, next) {
    const filename = path.join(compiler.outputPath, 'index.html')
    compiler.outputFileSystem.readFile(filename, (err, result) => {
      if (err) {
        return next(err)
      }
      res.set('content-type', 'text/html')
      res.send(result)
      res.end()
    })
  })
} else {
  debug(
    'Server is being run outside of live development mode, meaning it will ' +
    'only serve the compiled application bundle in ~/dist. Generally you ' +
    'do not need an application server for this and can instead use a web ' +
    'server such as nginx to serve your static files. See the "deployment" ' +
    'section in the README for more information on deployment strategies.'
  )

  // Serving ~/dist by default. Ideally these files should be served by
  // the web server and not the app server, but this helps to demo the
  // server in production.
  app.use(express.static(project.paths.dist()))
}

module.exports = app
