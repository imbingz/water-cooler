const router = require('express').Router();
const mongoose = require('mongoose');
const db = require('../models');

// api/user/signup
router.post('/signup', async ({ body }, res) => {
	try {
		console.log(body);
		const userExists = await db.User.findOne(body.email);

		if (userExists) throw 'User with this email already exists!';

		const result = await db.User.create(body);
		res.json(result);
	} catch (error) {
		res.status(400).json(error);
	}
});

module.exports = router;
