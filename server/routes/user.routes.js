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

// Search is working. Need to find a way to return partial matches
router.post('/search', ({ body }, res) => {
    // console.log('Hit API: ', body);
    db.User.find({ $text: { $search: body.search } })
        .then((query) => {
            console.log(query);
            const response = [];
            if (query.length === 0) {
                res.json({ success: false })
                return;
            }
            for (let users of query) {
                let user = {
                    username: users.username,
                    firstName: users.firstName,
                    lastName: users.lastName,
                    imageSrc: users.imageSrc,
                    pending: users.inboundPendingFriends,
                    invitedId: users._id,
                }
                response.push(user);
            }
            console.log(response);
            res.json({ success: true, query: response })
        })
});

// Send Friend Request
router.put('/friends/req', ({ body }, res) => {

    console.log('Hit Friend Put API: ', body);


    // Maybe make this promise based to have less .then and a catch? 
    db.User.findByIdAndUpdate(
        { _id: body.invited },
        { $push: { inboundPendingFriends: body.inviter } },
        { new: true }
    )
        .then(invited => {
            console.log(invited);
            db.User.findOneAndUpdate(
                { _id: body.inviter },
                { $push: { outboundPendingFriends: body.invited } },
                { new: true }
            )
                .then(inviter => {
                    console.log(inviter);
                    res.json({ success: true })
                })
        })
});

router.post('/friends/inpending', ({ body }, res) => {
    console.log("Hit Inbound Friend Req API: ", body);
    const response = [];
    db.User.find({ _id: body.id })
        .then(user => {
            console.log("User's Info");
            console.log(user);
            const idArray = user[0].inboundPendingFriends;
            console.log(idArray);
            db.User.find({ _id: { $in: idArray } })
                .then(data => {
                    console.log("WORK>!!>!>");
                    console.log(data);
                    data.map(userRaw => {
                        let userParsed = {
                            username: userRaw.username,
                            firstName: userRaw.firstName,
                            lastName: userRaw.lastName,
                            imageSrc: userRaw.imageSrc,
                            userID: userRaw._id,
                        }
                        console.log('parsed');
                        console.log(userParsed);
                        response.push(userParsed);
                    })
                    console.log("response");
                    console.log(response);
                    res.json({ success: true, friends: response})
                })
        })

});

module.exports = router;
