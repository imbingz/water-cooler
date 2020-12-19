const mongoose = require('mongoose');

const RoomSchema = new mongoose.Schema({
    roomName: {
        type: String,
        required: true
    },
    publicRoomId: {
        type: String,
        required: true
    },
    roomUsers: {
        type: Array,
        default: []
    }
});

const Room = mongoose.model('Room', RoomSchema);

module.exports = Room;
