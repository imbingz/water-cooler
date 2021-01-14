require('../config/db')();

const db = require('../models');

const makeAsync = async () => {
    try {
        // * Create User Seed Data
        await db.User.insertMany([
            {
                email: 'atheon@demo.com',
                password: '1234',
                username: 'Atheon',
                firstName: 'Atheon',
                lastName: 'Fisher',
                status: 0,
                inboundPendingRooms: [],
                inboundPendingFriends: [],
                outboundPendingFriends: [],
                friends: [],
                blocked: [],
                imageSrc: 'https://i.imgur.com/zwKJdmu.png',
                activeRoom: '',
            },
            {
                email: 'crota@test.com',
                password: 'crotasend',
                username: 'Scrota',
                firstName: 'Crota',
                lastName: 'Gibson',
                status: 0,
                inboundPendingRooms: [],
                inboundPendingFriends: [],
                outboundPendingFriends: [],
                friends: [],
                blocked: [],
                imageSrc: 'https://i.imgur.com/va1mKO4.png',
                activeRoom: '',
            },
            {
                email: 'dreadnaught@saturn.com',
                password: 'kingsfall',
                username: 'Auryx',
                firstName: 'Oryx',
                lastName: 'Clarke',
                status: 0,
                inboundPendingRooms: [],
                inboundPendingFriends: [],
                outboundPendingFriends: [],
                friends: [],
                blocked: [],
                imageSrc:  'https://i.imgur.com/J3WVW32.png',
                activeRoom: '',
            },
            {
                email: 'dreadnaught7@saturn.com',
                password: 'kingsfalls',
                username: 'Auryous',
                firstName: 'Frazier',
                lastName: 'Davidson',
                status: 0,
                inboundPendingRooms: [],
                inboundPendingFriends: [],
                outboundPendingFriends: [],
                friends: [],
                blocked: [],
                imageSrc: 'https://i.imgur.com/GtlpcYn.png',
                activeRoom: '',
            },
            {
                email: 'plaguelands@earth.com',
                password: 'wrathofthemachine',
                username: 'Spider',
                firstName: 'Aksis',
                lastName: 'Trevino',
                status: 0,
                inboundPendingRooms: [],
                inboundPendingFriends: [],
                outboundPendingFriends: [],
                friends: [],
                blocked: [],
                imageSrc: 'https://i.imgur.com/p9ds8Ih.png',
                activeRoom: '',
            },
            {
                email: 'theleviathan@space.com',
                password: 'thelaviathan',
                username: 'Rich',
                firstName: 'Emperor',
                lastName: 'Calus',
                status: 0,
                inboundPendingRooms: [],
                inboundPendingFriends: [],
                outboundPendingFriends: [],
                friends: [],
                blocked: [],
                imageSrc: 'https://i.imgur.com/OHlDfXA.png',
                activeRoom: '',
            },
            {
                email: 'hydra@space.com',
                password: 'eaterofworlds',
                username: 'hydra',
                firstName: 'Argos',
                lastName: 'Hester',
                status: 0,
                inboundPendingRooms: [],
                inboundPendingFriends: [],
                outboundPendingFriends: [],
                friends: [],
                blocked: [],
                imageSrc: 'https://i.imgur.com/GtlpcYn.png',
                activeRoom: '',
            },
            {
                email: 'barnett@space.com',
                password: 'spireofstars',
                username: 'somecabal',
                firstName: 'Val Cauor',
                lastName: 'Barnett',
                status: 0,
                inboundPendingRooms: [],
                inboundPendingFriends: [],
                outboundPendingFriends: [],
                friends: [],
                blocked: [],
                imageSrc:  'https://i.imgur.com/zwKJdmu.png',
                activeRoom: '',
            },
            {
                email: 'dreamingcity@abc.com',
                password: 'lastwish',
                username: 'Riven',
                firstName: 'Riven',
                lastName: 'Myrtle',
                status: 0,
                inboundPendingRooms: [],
                inboundPendingFriends: [],
                outboundPendingFriends: [],
                friends: [],
                blocked: [],
                imageSrc: 'https://i.imgur.com/J3WVW32.png',
                activeRoom: '',
            },
        ]);

        // * Store User IDs in Array
        const userIdArr = [];
        const users = await db.User.find({});
        users.forEach(user => {
            userIdArr.push(user._id.toString());
        });
        // console.log(userIdArr.length);

        // * Create Room Seed Data using userIdArr
        await db.Room.insertMany([
            {
                roomName: 'Room Name One',
                publicRoomId: '12345',
                roomUsers: [userIdArr[1], userIdArr[2], userIdArr[5]],
                roomCreator: userIdArr[0],
                roomImg: 'assets/images/roomImg/cafe-doubled.png',
                roomDesc: 'This is room description one',
                socialSpaces: [],
            }, 
            {
                roomName: 'Room Name Two',
                publicRoomId: '52341',
                roomUsers: [userIdArr[4]],
                roomCreator: userIdArr[3],
                roomImg: 'assets/images/roomImg/casino-doubled.png',
                roomDesc: 'This is room description Two',
                socialSpaces: [],
            },
            {
                roomName: 'Room Name Three',
                publicRoomId: '31245',
                roomUsers: [userIdArr[7], userIdArr[8]],
                roomCreator: userIdArr[6],
                roomImg: 'assets/images/roomImg/cafe-doubled.png',
                roomDesc: 'This is room description Three',
                socialSpaces: [],
            }
        ]);

        // * Room User IDs in Array
        const roomIdArr = [];
        const rooms = await db.Room.find({});
        rooms.forEach(room => {
            roomIdArr.push(room._id.toString());
        });
        // console.log(roomIdArr);

        // * Social Space Seed Data using userIdArr
        await db.SocialSpace.insertMany([
            {
                publicRoomId: '12345',
                socialSpaceName: 'Space Name One',
                publicSocialSpaceId: 'some public space id',
                socialSpaceUsers: [userIdArr[1], userIdArr[3]],
            },
            {
                publicRoomId: '14235',
                socialSpaceName: 'Space Name Two',
                publicSocialSpaceId: 'some public space id',
                socialSpaceUsers: [userIdArr[5]],
            },
            {
                publicRoomId: '13425',
                socialSpaceName: 'Space Name Three',
                publicSocialSpaceId: 'some public space id',
                socialSpaceUsers: [userIdArr[2], userIdArr[8], userIdArr[7]],
            },
        ]);

        // * Store Space IDs in Array
        const spaceIdArr = [];
        const spaces = await db.SocialSpace.find({});
        spaces.forEach(space => {
            spaceIdArr.push(space._id.toString());
        });
        // console.log(spaceIdArr);

        // * Populate Each Room With Social Spaces
        for (let i = 0; i < roomIdArr.length; i++) {
            await db.Room.findOneAndUpdate(
                { _id:  roomIdArr[i]},
                { $set: { socialSpaces: spaceIdArr } },
                { new: true }
            )
                // .then(data => console.log(data))
                .catch(err => console.log(err));
        }

        // * Give First Three Users an Active Room
        for (let i = 0; i < 3; i++) {
            await db.User.findOneAndUpdate(
                { _id:  userIdArr[i]},
                { $set: { activeRoom: ''+ roomIdArr[i]+'' } },
                { new: true }
            )
                // .then(data => console.log(data))
                .catch(err => console.log(err));
        }
    } catch (err) {
        console.log(err);
    }

};

makeAsync();