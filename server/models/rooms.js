const mongoose = require('mongoose');

const RoomSchema = new mongoose.Schema ({
  users: {
    type: Array,
    required: true
  }
});

const Rooms = mongoose.model('Rooms', RoomSchema);

module.exports = Rooms;