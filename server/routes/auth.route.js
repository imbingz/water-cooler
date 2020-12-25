const router = require('express').Router();
const bcrypt = require('bcryptjs');
const passport = require('../config/passport');
const db = require('../models');
const authRequired = require('../middlewares/authRequired');

// api/user/signup
router.post('/signup', ({body}, res) => {
    const { email, password, username } = body;
    
    if (!email || !password || !username) {
      
        return res.status(422).json({ error: 'Please fill all the fields' });
    }
    
    db.User
        .findOne({ email: email })
        .then(savedUser => {
            if (savedUser) {
                return res.status(422).json({ error: 'user already exists with that email' });
            }
            //hash user password before saving to db - do this in schema ?
            bcrypt.hash(password, 12).then(hashedpassword => {
            
                const user = new db.User({
                    email,
                    password: hashedpassword,
                    username
                });
                //add new user to db
                user
                    .save()
                    .then( () => {
                        res.json({ success: true, message: ' saved in db successfully' });
                    })
                    .catch(err => console.error(err));
            });
        })
        .catch(err => console.error(err));
});


// api/user/login
router.post('/login', (req, res, next) => {
    passport.authenticate('local', async (err, user) => {
       
        try {
            if (err || !user) {
                const error = new Error('An Error occurred');
                return next(error);
            }
            
            req.login(user, { session: false }, error => {
                if (error) {return next(error);}
                return res.status(200).json({success: true, user: user });
            });
        } catch (error) {
            return next(error);
        }
    })(req, res, next);
});


// api/user/login
router.put('/profile', authRequired, ({ body }, res) => {

    db.User
        .findByIdAndUpdate({ _id: body.user._id }, body.user, { new: true })
        .then(savedUser => {
            if (!savedUser) {
                return res.status(422).json({ error: 'Could not find this user' });
            }

            res.json({ success: true, user: savedUser });
        })
        .catch(err => {
            console.log(err);
        });
});


// api/user/logout
router.get('/logout', (req, res) => {
    if (req.session) {
        req.session.destroy();
        req.logout();
        res.status(200).json({success: true, message: 'logged out' });
    }
    else {
        const err = new Error('You are not logged in!');
        err.status = 403;
        next(err);
    }
});

// * Search for other users
//  // Search is working. Need to find a way to return partial matches
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
        res.json({ success: false });
    }
});


module.exports = router;