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

// api/use/login
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

module.exports = router;
