const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
	email: {
		type: String,
		required: 'Email is required'
	},
	password: {
		type: String,
		required: 'Password is required'
	},
	username: {
		type: String,
		require: 'Usernameeee is required'
	},
	firstName: {
		type: String,
		default: ''
	},
	lastName: {
		type: String,
		default: ''
	},
	status: {
		type: Number,
		default: 0
	},
	inboundPendingFriends: {
		type: Array,
		default: []
	},
	outboundPendingFriends: {
		type: Array,
		default: []
	},
	friends: {
		type: Array,
		default: []
	},
	blocked: {
		type: Array,
		default: []
	},
	imageSrc: {
		type: String,
		default: ''
	}
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
