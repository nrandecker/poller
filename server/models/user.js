const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema({
  local: {
    email: { type: String, unique: true },
    password: { type: String, select: false },
    firstName: { type: String },
    lastName: { type: String },
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    accessToken: String,
  },
  google: {
    id: String,
    token: String,
    email: String,
    name: String,
  },
  github: {
    id: String,
    token: String,
    email: String,
    name: String,
  },
});

// generate hash
userSchema.methods.generateHash = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function (password, cb) {
  const promise = this.model('User').find({}, '+local.password').exec();
  promise.then((user) => {
    return cb(bcrypt.compareSync(password, user[0].local.password));
  })
  .catch((err) => {
    console.log(err);
  });
};

module.exports = mongoose.model('User', userSchema);
