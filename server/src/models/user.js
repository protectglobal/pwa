const mongoose = require('mongoose');

const schema = mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now,
  },
  phone: {
    type: String,
  },
});

const User = mongoose.model('User', schema);

module.exports = User;
