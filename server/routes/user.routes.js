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
router.put('/profile', ( req, res) => {
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


router.post('/search', ({ body }, res) => {
    // console.log('Hit API: ', body);
    db.User.find({ $text: { $search: body.search }})
        .then((query) => {
            console.log(query);
            const response = [];
            if (query.length === 0) {
                console.log('No Match 😮');
                return;
            }
            for (let users of query) {
                let user = {
                    username: users.username,
                    firstName: users.firstName,
                    lastName: users.lastName,
                    imageSrc: users.imageSrc,
                    ref: users._id,
                }
                response.push(user);
            }
            console.log(response);
            res.json({ success: true, query: response })
        })
});

router.put('/friends', ({ body }, res) => {
    // let invited = false;
    // let inviter = false;
    console.log('Hit Friend Put API: ', body);
    db.User.findByIdAndUpdate(
            {_id: body.invited},
            {$push: { outboundPendingFriends: body.invited}},
            { new: true }
        )
        .then(invited => {
            console.log(invited);
            db.User.findOneAndUpdate(
                {_id: body.inviter},
                {$push: { inboundPendingFriends: body.inviter}},
                { new: true }
            )
            .then(inviter => {
                console.log(inviter);
                res.json({ success: true})
            })
        })
    
    // console.log(invited, inviter);
    // if (invited && inviter) {
    //     console.log("Done it");
    //     res.json({ success: true})
    // }
})


module.exports = router;
