const router = require('express').Router();
const mongoose = require('mongoose');
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
		.catch(e => {
			console.error(e);
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
router.patch('/profile', ({ body }, res) => {
	console.log('patch route /profile body obj: ', body);
	console.log(body.user.email);

	db.User
		.findByIdAndUpdate({ _id: body.user._id }, body.user, { new: true })
		.then(savedUser => {
			if (!savedUser) {
				return res.status(422).json({ error: 'Could not find this user' });
			}

			console.log("updated user PATCH 'api/user/profile", savedUser);

			res.json({ success: true, user: savedUser });
		})
		.catch(err => {
			console.log(err);
		});
});

module.exports = router;
