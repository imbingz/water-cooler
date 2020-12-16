const mongoose = require('mongoose');

const RoomSchema = new mongoose.Schema({
<<<<<<< HEAD
	name: {
		type: String,
		required: true
	},
	publicID: {
		type: String,
		required: true
	},
	users: {
		type: Array,
		default: []
	}
=======
    users: {
        type: Array,
        refault: []
    }
>>>>>>> master
});

const Room = mongoose.model('Room', RoomSchema);

module.exports = Room;
