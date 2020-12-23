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
