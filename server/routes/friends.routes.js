const router = require('express').Router();
const db = require('../models');
const { dbArray } = require('../controllers/user-arrays');

// * Accepting Friend Request
router.put('/accept', async ({ body }, res) => {
    // console.log('Hit Accept Friend Req API: ', body);
    try {
        // ** Access User's Friend's Db and Push User's ID to 'friends' Array
        dbArray.push('friends', body.friend, body.user);
        // ** Access User's Friend's db and Pull User's ID From 'outboundPendingFriends' array
        dbArray.pull('outboundPendingFriends', body.friend, body.user);
        // ** Access User's db and Push Friend's ID to 'friends' Array
        dbArray.push('friends', body.user, body.friend);
        // ** Access User's db and Pull Friend's From 'inboundPendingFriends' Array
        dbArray.pull('inboundPendingFriends', body.user, body.friend);
        // ** Send Success to Client
        res.json({ success: true });
    } catch (err) {
        console.log('/api/friends/accept error: ', err);
        res.json({ success: false });
    }
});

// * Block User Request
router.put('/block', async ({ body }, res) => {
    // console.log('Hit Accept Friend Req API: ', body);
    try {
        // ** Access User's Friend's db and Pull User's ID From 'outboundPendingFriends' Array
        dbArray.pull('outboundPendingFriends', body.friend, body.user);
        // ** Access User's db and Pull Friend's ID From 'inboundPendingFriends' Array
        dbArray.pull('inboundPendingFriends', body.user, body.friend);
        // ** Access User's db and Update 'blocked' Array
        dbArray.push('blocked', body.user, body.friend);
        // ** Send Success to Client
        res.json({ success: true });
    } catch (err) {
        console.log('/api/friends/decline error: ', err);
        res.json({ success: false });
    }
});

// * Decline Friend Request
router.put('/decline', async ({ body }, res) => {
    // console.log('Hit Decline Friend Req API: ', body);
    try {
        // ** Access User's Friend's db and Pull User's ID From 'outboundPendingFriends' array
        dbArray.pull('outboundPendingFriends', body.friend, body.user);
        // ** Access User's db and Pull Friend's ID From 'inboundPendingFriends' Array
        dbArray.pull('inboundPendingFriends', body.user, body.friend);
        // ** Send Success to Client
        res.json({ success: true });
    } catch (err) {
        console.log('/api/friends/decline error: ', err);
        res.json({ success: false });
    }
});

// * Find User's Friends, Inbound Requests, and Blocked Users
router.post('/arrays', async ({ body }, res) => {
    // console.log('Hit Friend Array API: ', body);
    try {
        // * Functions
        // !* this needs a try/catch block
        const processUsers = async (ids) => {
            // * Get DB Info for All IDs in idArray
            const returnedUsers = await db.User.find({ _id: { $in: ids } });
            // ** If no friends found, End Function
            if (!returnedUsers) {
                console.log('No friends found');
                res.json({ success: false });
                return;
            }
            // * Store Data To Send Back To Client
            const response = [];

            // * Loop Through Results to Store Relevant Data in an Object
            returnedUsers.forEach(friends => {
                let userParsed = {
                    username: friends.username,
                    firstName: friends.firstName,
                    lastName: friends.lastName,
                    imageSrc: friends.imageSrc,
                    friendId: friends._id,
                    activeRoom: friends.activeRoom,
                    status: friends.status,
                };

                // *** Push Each Result to response
                response.push(userParsed);
            });

            // ** Send Filtered Response to Client
            res.json({ success: true, retUsers: response });
        };

        const processRooms = async (ids) => {
            // !* this needs a try/catch block
            // * Get DB Info for All IDs in idArray
            const returnedRooms = await db.Room.find({ publicRoomId: { $in: ids } });
            // ** If no friends found, End Function
            if (!returnedRooms) {
                console.log('No rooms found');
                res.json({ success: false });
                return;
            }
            res.json({ success: true, retRooms: returnedRooms });
        };

        
        
        // * Find User's DB Info
        const user = await db.User.find({ _id: body.id });
        // * Containers for Different Cases
        let idArray;
        switch (body.case) {
            case 'friends':
                // ** Store Their Friends in a Variable
                idArray = user[0].friends;
                processUsers(idArray);              
                break;
            case 'inpending':
                // ** Store Their inboundPendingFriends in a Variable
                idArray = user[0].inboundPendingFriends;
                processUsers(idArray);   
                break;
            case 'inpendingRooms':
                // ** Store Their inboundPendingFriends in a Variable
                idArray = user[0].inboundPendingRooms;
                processRooms(idArray);
                break;
            case 'blocked':
                // ** Store Their Blocked Users in a Variable
                idArray = user[0].blocked;
                processUsers(idArray);   
                break;
            default:
                console.log('No case matched');
                res.json({ success: false });
        }

    } catch (err) {
        console.log('/api/friends/array (' + body.case + ') error: ', err);
        res.json({ success: false });
    }

});


// * Send Friend Request
router.put('/request', async ({ body }, res) => {
    // console.log('Hit Send Friend Req API: ', body);
    try {
        // ** Find User's Friend's db and Push User's ID to 'inboundPendingFriends' Array
        dbArray.push('inboundPendingFriends', body.friend, body.user);
        // ** Find User's db and Push the Friend's ID to 'outboundPendingFriends'
        dbArray.push('outboundPendingFriends', body.user, body.friend);
        // ** Send Success To Server
        res.json({ success: true });
    } catch (err) {
        console.log('/api/friends/req error: ', err);
        res.json({ success: false });
    }
});

// * Unfriend Friend
router.put('/unfriend', async ({ body }, res) => {
    // console.log('Hit Accept Friend Req API: ', body);
    try {
        // ** Access User's Friend's Db and Pull User's ID From 'friends' Array
        dbArray.pull('friends', body.friend, body.user);

        // ** Access User's db and Pull Friend's ID From 'friends' Array
        dbArray.pull('friends', body.user, body.friend);
    } catch (err) {
        console.log('/api/friends/accept error: ', err);
        res.json({ success: false });
    } finally {
        // ** Send Success to Client
        res.json({ success: true });
    }
});

module.exports = router;