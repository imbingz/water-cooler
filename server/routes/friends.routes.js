const router = require('express').Router();
const db = require('../models');

// * Functions
// ** Manage friends Array 

const accessDB = {
    // *** Push To friends Array
    push: async (queryId, insertId, array) => {
        try {
            const user = await db.User.findByIdAndUpdate( // eslint-disable-line no-unused-vars 
                { _id: queryId },
                { $addToSet: { [array]: insertId } },
                { new: true }
            );
            console.log(user);
            return user;
        } catch (err) {
            console.log('Friends Arr Push Error: ', err);
        }
    }, 
    // *** Pull From friends Array
    pull: async (queryId, insertId, array) => {
        try {
            const user = await db.User.findByIdAndUpdate( // eslint-disable-line no-unused-vars 
                { _id: queryId },
                { $pull: { [array]: insertId } },
                { new: true }
            );
            console.log(user);
            return user;
        } catch (err) {
            console.log('Friends Arr Pull Error: ', err);
        }
    }
};


const friendsArray = {
    // *** Push To friends Array
    push: async (queryId, insertId) => {
        try {
            const user = await db.User.findByIdAndUpdate( // eslint-disable-line no-unused-vars 
                { _id: queryId },
                { $addToSet: { friends: insertId } },
                { new: true }
            );
            console.log(user);
            return user;
        } catch (err) {
            console.log('Friends Arr Push Error: ', err);
        }
    }, 
    // *** Pull From friends Array
    pull: async (queryId, insertId) => {
        try {
            const user = await db.User.findByIdAndUpdate( // eslint-disable-line no-unused-vars 
                { _id: queryId },
                { $pull: { friends: insertId } },
                { new: true }
            );
            console.log(user);
            return user;
        } catch (err) {
            console.log('Friends Arr Pull Error: ', err);
        }
    }
};

// ** Manage outboundPendingFriends Array
const outboundArray = {
    // *** Push To outboundPendingFriends Array
    push: async (queryId, insertId) => {
        try {
            const user = await db.User.findByIdAndUpdate( // eslint-disable-line no-unused-vars 
                { _id: queryId },
                { $addToSet: { outboundPendingFriends: insertId } },
                { new: true }
            );
            console.log(user);
            return user;
        } catch (err) {
            console.log('OutboundPendingFriends Arr Push Error: ', err);
        }
    }, 
    // *** Push To outboundPendingFriends Array
    pull: async (queryId, insertId) => {
        try {
            const user = await db.User.findByIdAndUpdate( // eslint-disable-line no-unused-vars 
                { _id: queryId },
                { $pull: { outboundPendingFriends: insertId } },
                { new: true }
            );
            console.log(user);
            return user;
        } catch (err) {
            console.log('OutboundPendingFriends Arr Pull Error: ', err);
        }
    }
};

// ** Manage inboundPendingFriends Array
const inboundArray = {
    // *** Push To inboundPendingFriends Array
    push: async (queryId, insertId) => {
        try {
            const user = await db.User.findByIdAndUpdate( // eslint-disable-line no-unused-vars 
                { _id: queryId },
                { $addToSet: { inboundPendingFriends: insertId } },
                { new: true }
            );
            console.log(user);
            return user;
        } catch (err) {
            console.log('InboundPendingFriends Arr Push Error: ', err);
        }
    }, 
    // *** Push To inboundPendingFriends Array
    pull: async (queryId, insertId) => {
        try {
            const user = await db.User.findByIdAndUpdate( // eslint-disable-line no-unused-vars 
                { _id: queryId },
                { $pull: { inboundPendingFriends: insertId } },
                { new: true }
            );
            console.log(user);
            return user;
        } catch (err) {
            console.log('InboundPendingFriends Arr Pull Error: ', err);
        }
    }
};

// ** Manage Blocked Array
const blockedArray = {
    // *** Push To blocked Array
    push: async (queryId, insertId) => {
        try {
            const user = await db.User.findByIdAndUpdate( // eslint-disable-line no-unused-vars 
                { _id: queryId },
                { $addToSet: { blocked: insertId } },
                { new: true }
            );
            console.log(user);
            return user;
        } catch (err) {
            console.log('Blocked Arr Push Error: ', err);
        }
    }, 
    // *** Push To Blocked Array
    pull: async (queryId, insertId) => {
        try {
            const user = await db.User.findByIdAndUpdate( // eslint-disable-line no-unused-vars 
                { _id: queryId },
                { $pull: { blocked: insertId } },
                { new: true }
            );
            console.log(user);
            return user;
        } catch (err) {
            console.log('Blocked Arr Pull Error: ', err);
        }
    }
};


// * Accepting Friend Request
router.put('/accept', async ({ body }, res) => {
    // console.log('Hit Accept Friend Req API: ', body);
    try {
        // ** Access User's Friend's Db and Push User's ID to 'friends' Array
        // friendsArray.push(body.friend, body.user);
        accessDB.push(body.friend, body.user, friends);
        // ** Access User's Friend's db and Pull User's ID From 'outboundPendingFriends' array 
        // outboundArray.pull(body.friend, body.user);
        accessDB.pull(body.friend, body.user, outboundPendingFriends);
        // ** Access User's db and Push Friend's ID to friends Array
        // friendsArray.push(body.user, body.friend);
        accessDB.push(body.user, body.friend, friends);
        // ** Access User's db and Pull Friend's From 'inboundPendingFriends' Array
        // inboundArray.pull(body.user, body.friend);
        accessDB.pull(body.user, body.friend, inboundPendingFriends);
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
        // ** Access User's Friend's db and Pull User's ID From outbound Array 
        outboundArray.pull(body.friend, body.user);
        // ** Access User's db and Pull Friend's ID From inbound Array
        inboundArray.pull(body.user, body.friend);
        // ** Access User's db and Update blocked Array
        blockedArray.push(body.user, body.friend);
        // ** Send Success to Client
        res.json({ success: true });
    } catch (err) {
        console.log('/api/friends/decline error: ', err);
        res.json({ success: false });
    }
});

// * Decline Friend Request
router.put('/decline', async ({ body }, res) => {
    // console.log('Hit Accept Friend Req API: ', body);
    try {
        // ** Access User's Friend's db and Pull User's ID From outbound array 
        outboundArray.pull(body.friend, body.user);
        // ** Access User's db and Pull Friend's ID From inbound Array
        inboundArray.pull(body.user, body.friend);
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
        friends.forEach(userRaw => {
            let userParsed = {
                username: userRaw.username,
                firstName: userRaw.firstName,
                lastName: userRaw.lastName,
                imageSrc: userRaw.imageSrc,
                userID: userRaw._id,
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
        pendingFriends.forEach(userRaw => {
            let userParsed = {
                username: userRaw.username,
                firstName: userRaw.firstName,
                lastName: userRaw.lastName,
                imageSrc: userRaw.imageSrc,
                userID: userRaw._id,
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
    try {
        // ** Find User's db and Push the Friend's ID to outboundPendingFriends
        outboundArray.push(body.user, body.friend);
        // ** Find Invited User's db and Push the Id of the User to inboundPendingFriends Array
        inboundArray.push(body.friend, body.user);
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
        // ** Access User's Friend's Db and Pull User's ID From friends Array
        friendsArray.pull(body.friend, body.user);
        // ** Access User's db and Pull Friend's From Friends Array
        friendsArray.pull(body.user, body.friend);
        // ** Send Success to Client
        res.json({ success: true });
    } catch (err) {
        console.log('/api/friends/accept error: ', err);
        res.json({ success: false });
    }
});

module.exports = router;