const mongoose = require('mongoose');

const RoomChatSchema = new mongoose.Schema({
  roomID: {
    type: Number,
    required: 'roomID is required'
  },
  messages: {
    type: String,
    required: 'Message is required'
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  userID: {
    type: Number,
    required: 'userID is required'
  }
});

const RoomChat = mongoose.model('RoomChat', RoomChatSchema);

module.exports = RoomChat;
