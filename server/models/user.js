const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: { type: String, select: false },
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  firstName: { type: String },
  lastName: { type: String },
  accessToken: String
})

module.exports = mongoose.model('User', UserSchema)
