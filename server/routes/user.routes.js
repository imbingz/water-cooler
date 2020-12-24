const router = require('express').Router();
// const mongoose = require('mongoose');
const db = require('../models');

// *** NOTE: NEED AUTHENTICATION AND HASH PASSWORDS IN THE FUTURE ** //

// api/user/signup
router.post('/signup', ({ body }, res) => {
    // console.log(body);
    db.User
        .create(body)
        .then(data => {
            res.json({ success: true, data });
        })
        .catch(err => {
            console.error(err);
            res.json({ success: false });
        });
});

// api/user/login
router.post('/login', ({ body }, res) => {
    const { email, password } = body;
    db.User
        .findOne({ email: email })
        .then(savedUser => {
            if (!savedUser || password !== savedUser.password) {
                return res.status(422).json({ error: 'Invalid Email or password' });
            }
            /***** NEED TO  MODIFY HERE LATER WHEN ADDING AUTHENTICATION  ***/
            console.log(savedUser);

            const { _id, username, email } = savedUser;

            res.json({ user: { _id, username, email } });
        })
        .catch(err => {
            console.log(err);
        });
});

// post api/user/profile
/***** NEED TO ADD AUTHENTICATION LATER ***/
// router.post('/profile', ({ body }, res) => {
// 	console.log(body);
// 	const { _id } = body;
// 	db.User
// 		.findById(_id)
// 		.then(savedUser => {
// 			if (!savedUser) {
// 				return res.status(422).json({ error: 'Could not find this user' });
// 			}
// 			// console.log("find the saved user for POST 'api/user/profile", savedUser);

// 			res.json({ success: true, user: savedUser });
// 		})
// 		.catch(err => {
// 			console.log(err);
// 		});
// });

// patch api/user/profile
router.put('/profile', (req, res) => {
    console.log('put route /profile body obj: ', req);
    console.log(body.user.email);

    db.User
        .findByIdAndUpdate({ _id: body.user._id }, body.user, { new: true })
        .then(savedUser => {
            if (!savedUser) {
                return res.status(422).json({ error: 'Could not find this user' });
            }

            console.log('updated user PATCH \'api/user/profile', savedUser);

            res.json({ success: true, user: savedUser });
        })
        .catch(err => {
            console.log(err);
        });
});

// * Search for other users
// Search is working. Need to find a way to return partial matches
router.post('/search', async ({ body }, res) => {
    // console.log('Hit API: ', body);
    try {
        // ** Search DB with Indexed Text Fields
        const query = await db.User.find({ $text: { $search: body.search } });
        // console.log(query);

        // ** End Function if No Results
        if (query.length === 0) {
            res.json({ success: false });
            return;
        }

        // ** Loop Through Results to Store Relevant Data in an Object, Then Push Object to response Array
        const response = [];
        for (let users of query) {
            let user = {
                username: users.username,
                firstName: users.firstName,
                lastName: users.lastName,
                imageSrc: users.imageSrc,
                pending: users.inboundPendingFriends,
                friends: users.friends,
                invitedId: users._id,
            };

            // *** Push Each Result to response
            response.push(user);
        }
        // console.log(response);

        // ** Send Filtered Response to Client
        res.json({ success: true, query: response });

    } catch (err) {
        console.log('/api/user/search error: ', err);
    }
});

// * Find User's Friends
router.post('/friendZone', ({ body }, res) => {
    // console.log("Hit Inbound Friend Req API: ", body);
    const response = [];
    // * Find User's DB Info
    db.User.find({ _id: body.id })
        .then(user => {
            // console.log("User's Info");
            // console.log(user);
            // ** Store Their Friends in a Variable
            const idArray = user[0].friends;
            // console.log(idArray);
            // ** Get DB Info for All IDs in idArray
            db.User.find({ _id: { $in: idArray } })
                .then(data => {
                    // console.log('Data');
                    // console.log(data);
                    // ** Loop Through Results to Store Relevant Data in an Object
                    data.forEach(userRaw => {
                        let userParsed = {
                            username: userRaw.username,
                            firstName: userRaw.firstName,
                            lastName: userRaw.lastName,
                            imageSrc: userRaw.imageSrc,
                            userID: userRaw._id,
                        };
                        // ** Push Each Result to response
                        // console.log('parsed');
                        // console.log(userParsed);
                        response.push(userParsed);
                    });
                    // ** Send Filtered Response to Client
                    // console.log("response");
                    // console.log(response);
                    res.json({ success: true, friends: response });
                });
        });
});

// * Find User's Friends
router.post('/friends', async ({ body }, res) => {
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


});

// * Find User's Pending Friend Requests
router.post('/friends/inpending', async ({ body }, res) => {
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
        console.log('/api/user/friends/inpending error: ', err);
        res.json({ success: false });
    }
});

// * Accepting Friend Request
router.put('/friends/accept', ({ body }, res) => {
    console.log('Hit Accept Friend Req API: ', body);
    // ** Access User's Friend'S Db and Update friends Array
    db.User.findByIdAndUpdate(
        { _id: body.friend },
        { $push: { friends: body.user } },
        { new: true }
    )
        .then(() => {
            // console.log({first}); // place first in cb
        });
    // ** Access User's Friend's db and Update outbound array 
    db.User.findByIdAndUpdate(
        { _id: body.friend },
        { $pull: { outboundPendingFriends: body.user } },
        { new: true }
    )
        .then(() => {
            // console.log({second}); // place second in cb
        });
    // ** Access User's db and Update Friends Array
    db.User.findOneAndUpdate(
        { _id: body.user },
        { $push: { friends: body.friend } },
        { new: true }
    )
        .then();
    // ** Access User's db and Update inbound Array
    db.User.findByIdAndUpdate(
        { _id: body.user },
        { $pull: { inboundPendingFriends: body.friend } },
        { new: true }
    )
        .then(() => {
            res.json({ success: true });
        });
});

// * Decline Friend Request
router.put('/friends/decline', ({ body }, res) => {
    console.log('Hit Accept Friend Req API: ', body);
    // ** Access User's Friend's db and Update outbound array 
    db.User.findByIdAndUpdate(
        { _id: body.friend },
        { $pull: { outboundPendingFriends: body.user } },
        { new: true }
    )
        .then((friend) => {
            console.log({ friend }); // place second in cb
        });

    // ** Access User's db and Update inbound Array
    db.User.findByIdAndUpdate(
        { _id: body.user },
        { $pull: { inboundPendingFriends: body.friend } },
        { new: true }
    )
        .then(() => {
            res.json({ success: true });
        });
});

// * Send Friend Request
router.put('/friends/req', async ({ body }, res) => {
    try {
        // ** Find User's db and Push the Invited User's Id to outboundPendingFriends
        const user = await db.User.findOneAndUpdate(
            { _id: body.user },
            { $push: { outboundPendingFriends: body.invited } },
            { new: true }
        );
        console.log({ user });

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
        console.log({ invited });

        // ** If invited is undefined, End Function
        if (!invited) {
            console.log('No document found or updated');
            res.json({ success: false });
            return;
        }

        res.json({ success: true });

    } catch (err) {
        console.log('/api/user/friends/req error: ', err);
        res.json({ success: false });
    }
});


module.exports = router;
