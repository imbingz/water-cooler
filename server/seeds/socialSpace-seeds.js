require('../config/db')();

const db = require('../models');

db.SocialSpace.insertMany([
    {
        publicRoomId: 'some public room id',
        socialSpaceName: 'Space Name One',
        publicSocialSpaceId: 'some public space id',
        socialSpaceUsers: ['5ff7c5efc65f41328409a38b', '5ff7c5efc65f41328409a38c']
    },
    {
        publicRoomId: 'some public room id',
        socialSpaceName: 'Space Name Two',
        publicSocialSpaceId: 'some public space id',
        socialSpaceUsers: ['5ff7c5efc65f41328409a38b', '5ff7c5efc65f41328409a38c']
    },
    {
        publicRoomId: 'some public room id',
        socialSpaceName: 'Space Name Three',
        publicSocialSpaceId: 'some public space id',
        socialSpaceUsers: ['5ff7c5efc65f41328409a38b', '5ff7c5efc65f41328409a38c']
    },

]);