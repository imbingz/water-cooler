const mongoose = require('mongoose');

const RoomChatSchema = new mongoose.Schema({
    roomId: {
        type: String,
        required: 'roomID is required'
    },
    message: {
        type: String,
        required: 'Message is required'
    },
    timestamp: {
        type: Date,
        default: Date.now
    },
    userId: {
        type: String,
        required: 'userID is required'
    },
    username: {
        type: String,
        required: 'username is required'
    }
});

const RoomChat = mongoose.model('RoomChat', RoomChatSchema);

module.exports = RoomChat;
