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

//pre-save hook that will hash password and be called before a document is saved in MongoDB.
UserSchema.pre('save', async function(next) {
	const user = this;
	//bcrypt to hash users password
	const hash = await bcrypt.hash(this.password, 10);
	this.password = hash;
	next();
});

//used for validating whetherthe user’s password is correct when they try to log in.
UserSchema.methods.isValidPassword = async function(password) {
	const user = this;
	const compare = await bcrypt.compare(password, user.password);
	return compare;
};f


const User = mongoose.model('User', UserSchema);

module.exports = User;
