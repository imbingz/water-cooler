const mongoose = require('mongoose');

const RoomChatSchema = new mongoose.Schema ({
  roomID: {
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

const RoomChats = mongoose.model('RoomChats', RoomChatSchema);

module.exports = RoomChats;