const mongoose = require('mongoose');

const RoomSchema = new mongoose.Schema({
	users: {
		type: Array,
		refault: []
	}
});

const Room = mongoose.model('Room', RoomSchema);

module.exports = Room;
