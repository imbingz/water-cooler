const mongoose = require('mongoose');

const DMSchema = new mongoose.Schema({
	message: {
		type: String,
		required: 'Message is required'
	},
	userID: {
		type: Number,
		required: 'userID is required'
	},
	timestamp: {
		type: Date,
		default: Date.now
	},
	read: {
		type: Boolean,
		default: false
	}
});

const DMChat = mongoose.model('DMChat', DMSchema);

module.exports = DMChat;
