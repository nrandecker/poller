const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

var userSchema = mongoose.Schema({
  local: {
    email: { type: String, unique: true },
    password: { type: String },
    firstName: { type: String },
    lastName: { type: String },
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    accessToken: String
  },
  google: {
    id           : String,
    token        : String,
    email        : String,
    name         : String
  }
});

// generate hash
userSchema.methods.generateHash = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('User', userSchema);
