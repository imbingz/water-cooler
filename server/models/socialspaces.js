const mongoose = require('mongoose');

const SocialSpaceSchema = new mongoose.Schema({
    publicRoomId: {
        type: String,
        required: 'RoomID is required'
    },
    socialSpaceName: {
        type: String,
        required: 'SocialSpaceName is required'
    },
    publicSocialSpaceId: {
        type: String,
        required: 'publicSocialSpaceId is required'
    },
    socialSpaceUsers: {
        type: Array,
        required: 'Users are required'
    }
});

const SocialSpace = mongoose.model('SocialSpace', SocialSpaceSchema);

module.exports = SocialSpace;
