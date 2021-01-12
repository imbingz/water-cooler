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
    },
    roomCreator: {
        type: String,
        required: 'roomCreator ID is required'
    },
    roomImg: {
        type: String,
        default: 'https://cdn.wallpapersafari.com/34/92/SClT0F.jpg'
    },
    roomDesc: {
        type: String,
        default: ''
    },
    socialSpaces: {
        type: Array,
        default: []
    },
});

const Room = mongoose.model('Room', RoomSchema);

module.exports = Room;
