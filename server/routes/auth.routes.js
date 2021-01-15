const router = require('express').Router();
const passport = require('../config/passport');
const db = require('../models');
const authRequired = require('../middlewares/authRequired');

// api/user/signup
router.post('/signup', async ({body}, res) => {

    try {
 
        const { email, password, username, firstName, lastName, imageSrc } = body;

        if (!email || !password || !username ||!firstName || !lastName || !imageSrc) {
      
            return res.status(422).json({ error: 'Please fill all the fields' });
        }
  
        const savedUser = await db.User.findOne({ email: email });

        if (savedUser) {
            return res.status(422).json({ error: 'user already exists with that email' });
        }  
        const user = new db.User(body);
        await user.save();
        
        res.json({ success: true, message: ' user saved in db successfully' });
    
    } catch (err) {
        console.error(err);
        res.status(500);
    }
});


// api/user/login
router.post('/login', passport.authenticate('local', {failureRedirect: '/'}), async (req, res) => { 
    try{
        if (!req.user) {
            const error = new Error('An Error occurred');
            return error;
        }
        return res.status(200).json({success: true, user: req.user });
    } catch (err) {
        console.error(err);
        res.status(500);
    }
    
});


// api/user/profile and profile update
router.put('/profile', authRequired, async ({ body }, res) => {
    try{
        //update db and return updated obj
        const savedUser = await db.User.findByIdAndUpdate( body.user._id, body.user, { new: true });
        //return error if no user found  
        if (!savedUser) {
            return res.status(422).json({ error: 'Could not find this user' });
        }

        res.json({ success: true, user: savedUser });

    } catch (err) {
        console.error(err);
        res.status(500);
    }
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
        res.status(403);
    }
});

// * Search for other users
//  // Search is working. Need to find a way to return partial matches
router.post('/search', async ({ body }, res) => {
    // console.log('Hit API: ', body);
    try {
        // ** Search DB with Indexed Text Fields
        const query = await db.User.find({ $text: { $search: body.search } });

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
                blocked: users.blocked,
                pending: users.inboundPendingFriends,
                friends: users.friends,
                friendId: users._id,
            };

            // *** Push Each Result to response
            response.push(user);
        }

        // ** Send Filtered Response to Client
        res.json({ success: true, query: response });

    } catch (err) {
        console.log('/api/user/search error: ', err);
        res.json({ success: false });
    }
});


module.exports = router;