const mongoose = require('mongoose');

const SocialSpaceChatSchema = new mongoose.Schema({
  socialSpaceID: {
    type: Number,
    required: true
  },
  messages: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  userID: {
    type: Number,
    required: true
  }
});

const SocialSpaceChats = mongoose.model('SocialSpaceChats', SocialSpaceChatSchema);

module.exports = SocialSpaceChats;