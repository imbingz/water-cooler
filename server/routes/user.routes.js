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
router.post('/search', ({ body }, res) => {
    // console.log('Hit API: ', body);
    // ** Search DB with Indexed Text Fields
    db.User.find({ $text: { $search: body.search } })
        .then((query) => {
            // ** End Function if No Results
            // console.log(query);
            const response = [];
            if (query.length === 0) {
                res.json({ success: false });
                return;
            }
            // ** Loop Through Results to Store Relevant Data in an Object
            for (let users of query) {
                let user = {
                    username: users.username,
                    firstName: users.firstName,
                    lastName: users.lastName,
                    imageSrc: users.imageSrc,
                    pending: users.inboundPendingFriends,
                    invitedId: users._id,
                };
                // ** Push Each Result to response
                response.push(user);
            }
            // console.log(response);
            // ** Send Filtered Response to Client
            res.json({ success: true, query: response });
        });
});

// * Send Friend Request
router.put('/friends/req', ({ body }, res) => {

    // Maybe make this promise based to have less .then and a catch? 
    // ** Find Invited User's db and Push the Id of the User to inboundPendingFriends Array
    db.User.findByIdAndUpdate(
        { _id: body.invited },
        { $push: { inboundPendingFriends: body.user } },
        { new: true }
    )
        .then(() => {
            // console.log(invited); // place invited in cb
            // ** Find User's db and Push the Invited User's Id to outboundPendingFriends
            db.User.findOneAndUpdate(
                { _id: body.user },
                { $push: { outboundPendingFriends: body.invited } },
                { new: true }
            )
                .then(() => {
                    // console.log(user); // place user in cb
                    res.json({ success: true });
                });
        });
});

// * Find User's Pending Friend Requests
router.post('/friends/inpending', ({ body }, res) => {
    // console.log("Hit Inbound Friend Req API: ", body);
    const response = [];
    // * Find User's DB Info
    db.User.find({ _id: body.id })
        .then(user => {
            // console.log("User's Info");
            // console.log(user);
            // ** Store Their inboundPendingFriends in a Variable
            const idArray = user[0].inboundPendingFriends;
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
                    res.json({ success: true, friends: response});
                });
        });
});

// * Accepting Friend Request
router.put('/friends/accept', ({ body }, res) => {
    console.log('Hit Accept Friend Req API: ', body);
    // ** Access User's Friend'S Db and Update friends Array
    db.User.findByIdAndUpdate(
        { _id: body.friend},
        { $push: { friends: body.user } },
        { new: true }
    )
        .then(() => {
            // console.log({first}); // place first in cb
        });
    // ** Access User's Friend's db and Update outbound array 
    db.User.findByIdAndUpdate(
        { _id: body.friend },
        { $pull: { outboundPendingFriends: body.user }},
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




module.exports = router;
