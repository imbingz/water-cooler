const router = require('express').Router();
const db = require('../models');

// * Find User's Friends
router.post('/friends', async ({ body }, res) => {
    try {
        console.log('Hit Inbound Friend Req API: ', body);
        const response = [];

        // * Find User's DB Info
        const user = await db.User.find({ _id: body.id });
        console.log({ user });

        // ** Store Their Friends in a Variable
        const idArray = user[0].friends;
        console.log(idArray);

        // ** Get DB Info for All IDs in idArray
        const friends = await db.User.find({ _id: { $in: idArray } });
        console.log({ friends });
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
        console.log({ response });
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

// * Accepting Friend Request
router.put('/accept', async ({ body }, res) => {
    // console.log('Hit Accept Friend Req API: ', body);
    try {
        // ** Access User's Friend'S Db and Update friends Array
        const friendFriends = await db.User.findByIdAndUpdate( // eslint-disable-line no-unused-vars 
            { _id: body.friend },
            { $push: { friends: body.user } },
            { new: true }
        );
        // console.log(friendFriends);

        // ** Access User's Friend's db and Update outbound array 
        const friendOutbound = await db.User.findByIdAndUpdate( // eslint-disable-line no-unused-vars 
            { _id: body.friend },
            { $pull: { outboundPendingFriends: body.user } },
            { new: true }
        );
        // console.log(friendOutbound);

        // ** Access User's db and Update Friends Array

        const userFriend = await db.User.findOneAndUpdate( // eslint-disable-line no-unused-vars 
            { _id: body.user },
            { $push: { friends: body.friend } },
            { new: true }
        );
        // console.log(userFriend);

        // ** Access User's db and Update inbound Array
        const userInbound = await db.User.findByIdAndUpdate( // eslint-disable-line no-unused-vars 
            { _id: body.user },
            { $pull: { inboundPendingFriends: body.friend } },
            { new: true }
        );
        // console.log(userInbound);

        // ** Send Success to Client
        res.json({ success: true });
    } catch (err) {
        console.log('/api/friends/accept error: ', err);
        res.json({ success: false });
    }
});

// * Decline Friend Request
router.put('/decline', async ({ body }, res) => {
    // console.log('Hit Accept Friend Req API: ', body);
    try {
        // ** Access User's Friend's db and Update outbound array 
        const friend = await db.User.findByIdAndUpdate( // eslint-disable-line no-unused-vars
            { _id: body.friend },
            { $pull: { outboundPendingFriends: body.user } },
            { new: true }
        );
        // console.log(friend);

        // ** Access User's db and Update inbound Array
        const user = await db.User.findByIdAndUpdate( // eslint-disable-line no-unused-vars
            { _id: body.user },
            { $pull: { inboundPendingFriends: body.friend } },
            { new: true }
        );
        // console.log(user);

        // ** Send Success to Client
        res.json({ success: true });
    } catch (err) {
        console.log('/api/friends/decline error: ', err);
        res.json({ success: false });
    }
});

// * Send Friend Request
router.put('/req', async ({ body }, res) => {
    try {
        // ** Find User's db and Push the Invited User's Id to outboundPendingFriends
        const user = await db.User.findOneAndUpdate(
            { _id: body.user },
            { $push: { outboundPendingFriends: body.invited } },
            { new: true }
        );
        // console.log({ user });

        // ** If user is undefined, End Function
        if (!user) {
            console.log('No document found or updated');
            res.json({ success: false });
            return;
        }

        // ** Find Invited User's db and Push the Id of the User to inboundPendingFriends Array
        const invited = await db.User.findByIdAndUpdate(
            { _id: body.invited },
            { $push: { inboundPendingFriends: body.user } },
            { new: true }
        );
        // console.log({ invited });

        // ** If invited is undefined, End Function
        if (!invited) {
            console.log('No document found or updated');
            res.json({ success: false });
            return;
        }

        res.json({ success: true });

    } catch (err) {
        console.log('/api/friends/req error: ', err);
        res.json({ success: false });
    }
});

module.exports = router;