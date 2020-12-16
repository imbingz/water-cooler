const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../models');

const JWT_SECRET = process.env.JWT_SECRET;

//protected route for authenticated user (with token) to access resources
// router.get('/protected', isAuthenticated, (req, res) => {
// 	res.send('hello user');
// });

//signup route
router.post('/signup', ({body}, res) => {
    const { email, password, username } = body;

    if (!email || !password || !username) {
        //when encounter this type of error, earlier return
        return res.status(422).json({ error: 'Please fill all the fields' });
    }
    //If valid req.body, check if user already exists in the db
    db.User
        .findOne({ email: email })
        .then(savedUser => {
            if (savedUser) {
                return res.status(422).json({ error: 'user already exists with that email' });
            }
            //hash user password before saving to db - do this in schema ?
            bcrypt.hash(password, 12).then(hashedpassword => {
                //if not exists, then create a new use with model
                const user = new db.User({
                    email,
                    password: hashedpassword,
                    username
                });
                //add new user to db
                user
                    .save()
                    .then( () => {
                        res.json({ message: ' saved in db successfully' });
                    })
                    .catch(err => console.log(err));
            });
        })
        .catch(err => console.log(err));
});

//login route
router.post('/login', ({body}, res) => {
    const { email, password } = body;
    if (!email || !password) {
        return res.status(422).json({ error: 'Email and Password are required.' });
    }
    db.User
        .findOne({ email: email })
        .then(savedUser => {
            if (!savedUser) {
                return res.status(422).json({ error: 'Invalid email or password.' });
            }
            //compare password with password saved in db if valide user input
            bcrypt
                .compare(password, savedUser.password)
                .then(doMatch => {
                    if (doMatch) {
                    // res.json({ message: 'succssfully signed in' });
                    //use JWT to give authenticated user a koten based on user ID
                        const token = jwt.sign({ _id: savedUser._id }, JWT_SECRET);
                        //send token
                        res.json({ token });
                    } else {
                        return res.status(422).json({ error: 'Invalid email or password.' });
                    }
                })
                .catch(err => console.log(err));
        });
});

module.exports = router;
