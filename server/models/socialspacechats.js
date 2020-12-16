const mongoose = require('mongoose');

const SocialSpaceChatSchema = new mongoose.Schema({
    socialSpaceID: {
        type: Number,
        required: 'SocialspaceID is required'
    },
    messages: {
        type: String,
        required: 'Message is required'
    },
    timestamp: {
        type: Date,
        default: Date.now
    },
    userID: {
        type: Number,
        required: 'UserID is required'
    }
});

const SocialSpaceChat = mongoose.model('SocialSpaceChat', SocialSpaceChatSchema);

module.exports = SocialSpaceChat;
