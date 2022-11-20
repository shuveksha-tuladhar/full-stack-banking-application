const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  role: {
    type: String,
  },
  accountNumber: {
    type: Number,
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
