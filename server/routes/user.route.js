const router = require('express').Router();
const mongoose = require('mongoose');
const db = require('../models');

// api/user/signup
// router.post('/signup', async ({ body }, res) => {
// 	try {
// 		// const email = console.log(body);
// 		// const userExists = await db.User.findOne(body.email);

// 		// if (userExists) throw 'User with this email already exists!';

// 		const result = await db.User.create(body);
// 		res.json({ sucess: true, result });
// 	} catch (error) {
// 		res.status(400).json(error);
// 	}
// });

router.post('/signup', ({ body }, res) => {
	console.log(body);
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

module.exports = router;
