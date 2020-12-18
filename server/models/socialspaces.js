const mongoose = require('mongoose');

const SocialSpaceSchema = new mongoose.Schema({
    publicRoomId: {
        type: Number,
        required: 'RoomID is required'
    },
    socialSpacePublicId: {
        type: Number,
        required: 'socialSpacePublicId is required'
    },
    socialSpaceUsers: {
        type: Array,
        required: 'Users are required'
    }
});

const SocialSpace = mongoose.model('SocialSpace', SocialSpaceSchema);

module.exports = SocialSpace;
