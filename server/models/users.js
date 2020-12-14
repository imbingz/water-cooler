const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  username: {
    type: String,
    require: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  status: {
    type: Number
  },
  inboundPendingFriends: {
    type: Array
  },
  outboundPendingFriends: {
    type: Array
  },
  friends: {
    type: Array
  },
  blocked: {
    type: Array
  }
});

const Users = mongoose.model('Users', UserSchema);

module.exports = Users;
