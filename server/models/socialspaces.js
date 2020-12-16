const mongoose = require('mongoose');

const SocialSpaceSchema = new mongoose.Schema({
  roomID: {
    type: Number,
    required: 'RoomID is required'
  },
  users: {
    type: Array,
    required: 'Users are required'
  }
});

const SocialSpace = mongoose.model('SocialSpace', SocialSpaceSchema);

module.exports = SocialSpace;
