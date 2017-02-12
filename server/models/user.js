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
  polls: [{
    id: { type: String },
    title: { type: String },
    options: [{ text: { type: String }, votes: { type: Number } }],
    created: { type: String },
    createdBy: { type: String },
  }],
});

// generate hash
userSchema.methods.generateHash = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function (password, hashPassword) {
  return bcrypt.compareSync(password, hashPassword);
};

module.exports = mongoose.model('User', userSchema);
