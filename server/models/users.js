const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

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
        require: 'Username is required'
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


//used for validating whetherthe user’s password is correct when they try to log in.
UserSchema.methods.isValidPassword = async function(password) {
	const user = this;
	const compare = await bcrypt.compare(password, user.password);
	return compare;
};


const User = mongoose.model('User', UserSchema);

module.exports = User;
