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
        dbArray.pull('outboundPendingFriends', body.friend, body.user, );
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

// * Find User's Friends
router.post('/friends', async ({ body }, res) => {
    try {
        // console.log('Hit Friend Req API: ', body);
        // * Store Data To Send Back To Client
        const response = [];

        // * Find User's DB Info
        const user = await db.User.find({ _id: body.id });
        // console.log({ user });

        // ** Store Their Friends in a Variable
        const idArray = user[0].friends;
        // console.log(idArray);

        // ** Get DB Info for All IDs in idArray
        const friends = await db.User.find({ _id: { $in: idArray } });
        // console.log({ friends });
        // ** If no friends found, End Function
        if (!friends) {
            console.log('No friends found');
            res.json({ success: false });
            return;
        }

        // ** Loop Through Results to Store Relevant Data in an Object
        friends.forEach(friends => {
            let userParsed = {
                username: friends.username,
                firstName: friends.firstName,
                lastName: friends.lastName,
                imageSrc: friends.imageSrc,
                friendId: friends._id,
            };
            // console.log(userParsed);

            // *** Push Each Result to response
            response.push(userParsed);
        });

        // ** Send Filtered Response to Client
        // console.log({ response });
        res.json({ success: true, friends: response });
    } catch (err) {
        console.log('/api/friends/friends error: ', err);
        res.json({ success: false });
    }

});

// * Find User's Pending Friend Requests
router.post('/inpending', async ({ body }, res) => {
    // console.log("Hit Inbound Friend Req API: ", body);
    const response = [];
    try {
        // ** Find User's DB Info
        const user = await db.User.find({ _id: body.id });
        // console.log({user});

        // ** If user is undefined, End Function
        if (!user) {
            console.log('No document found');
            res.json({ success: false });
            return;
        }

        // ** Store Their inboundPendingFriends in a Variable
        const idArray = user[0].inboundPendingFriends;
        // console.log({idArray});

        // ** Get DB Info for All IDs in idArray
        const pendingFriends = await db.User.find({ _id: { $in: idArray } });
        // console.log({pendingFriends});

        // ** If no pending friends found, End Function
        if (!pendingFriends) {
            console.log('No inboundPendingFriends found');
            res.json({ success: false });
            return;
        }

        // ** Loop Through Results to Store Relevant Data in an Object
        pendingFriends.forEach(friends => {
            let userParsed = {
                username: friends.username,
                firstName: friends.firstName,
                lastName: friends.lastName,
                imageSrc: friends.imageSrc,
                friendId: friends._id,
            };
            // console.log({userParsed});

            // ** Push Each Result to response
            response.push(userParsed);
        });

        // ** Send Filtered Response to Client
        // console.log({response});
        res.json({ success: true, friends: response });

    } catch (err) {
        console.log('/api/friends/inpending error: ', err);
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
        // ** Send Success to Client
        res.json({ success: true });
    } catch (err) {
        console.log('/api/friends/accept error: ', err);
        res.json({ success: false });
    }
});

module.exports = router;