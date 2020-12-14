const mongoose = require('mongoose');

const DMSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true
  },
  userID: {
    type: Number,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  read: {
    type: Boolean,
    required: true
  }
});

const DMChats = mongoose.model('DMChats', DMSchema);

module.exports = DMChats;