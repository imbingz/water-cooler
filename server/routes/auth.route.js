const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../models');
const isAuthenticated = require('../middlewares/isAuthenticatetd');

const JWT_SECRET = process.env.JWT_SECRET;



// protected route for authenticated user (with token) to access resources ===> test codes
router.patch('/protected', isAuthenticated, (req, res) => {
    res.send('hello user');
});

//signup route
router.post('/signup', ({body}, res) => {
    const { email, password, username } = body;
    // console.log(process.env.JWT_SECRET);
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
                    .catch(err => console.error(err));
            });
        })
        .catch(err => console.error(err));
});

//login route
router.post('/login', ({body}, res) => {
    const { email, password } = body;
    console.log(JWT_SECRET);
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
                    //use JWT to give authenticated user a koten based on user ID
                        const token = jwt.sign({ _id: savedUser._id }, JWT_SECRET);
                        
                        const { _id, username, email } = savedUser;
                        //send token
                        res.json({ token, user: { _id, username, email } });
                    } else {
                        return res.status(422).json({ error: 'Invalid email or password.' });
                    }
                })
                .catch(err => console.error(err));
        });
});

// api/user/profile  *** protected route that requires user login
router.put('/profile', isAuthenticated, ({ body }, res) => {
    console.log('put route /profile body obj: ', body);
    
    /********* TEST PURPOSE ********/
    // res.send('hello user');

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
            console.error(err);
        });
});

module.exports = router;