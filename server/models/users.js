const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: 'Email is required',
        lowercase: true
    },
    password: {
        type: String,
        required: 'Password is required'
    },
    username: {
        type: String,
        require: 'Username is required',
        lowercase: true
    },
    firstName: {
        type: String,
        default: '',
        lowercase: true
    },
    lastName: {
        type: String,
        default: '',
        lowercase: true
    },
    status: {
        type: Number,
        default: 0
    },
    inboundPendingRooms: {
        type: Array,
        default: []
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

// UserSchema.methods.setFullName = function () {
//     this.fullName = this.firstName + " " + this.lastName;
// }

UserSchema.index({ 
    username: 'text',
    firstName: 'text',
    lastName: 'text',
    email: 'text'
});

const User = mongoose.model('User', UserSchema);
// User.createIndexes();

module.exports = User;
