const mongoose = require('mongoose');

const SocialSpaceSchema = new mongoose.Schema ({
  roomID: {
    type: Number,
    required: true
  },
  users: {
    type: Array,
    required: true
  }
});

const SocialSpaces = mongoose.model('SocialSpaces', SocialSpaceSchema);

module.exports = SocialSpaces;