const db = require('../models');
const router = require('express').Router();
const { Room } = require('../models');

// populates rooms page with public rooms
router
    .route('/')
    
    .get((req, res) => {
        console.log('/');
        Room
            .find({})
            .then(data => {
                res.json({ success: true, data });
            })
            .catch(err => {
                res.json({ success: false } + err);
            });
    });

// creates room
router
    .route('/create')
    .post((req, res) => {
        console.log('create');
        Room
            .create({
                roomName: req.body.roomName,
                publicRoomId: req.body.publicRoomId
            })
            .then(data => {
                res.json({ success: true, data });
            })
            .catch(err => {
                res.json({ success: false } + err);
            });
    });

// gathers rooms based on id
router
    .route('/find')
    .post((req, res) => {
        Room
            .findOne({ _id: req.body.id })
            .then(data => {
                res.json({ success: true, data });
            })
            .catch(err => {
                res.json({ success: false } + err);
            });
    });

router
    .route('/users')
    .post(async ({ body }, res) => {
        try {
            // * Get DB Info for All IDs in idArray
            const roomUsers = await db.User.find({ _id: { $in: body.users } });
            // console.log({ roomUsers });
            // ** If no friends found, End Function
            if (!roomUsers) {
                console.log('No users found');
                res.json({ success: false });
                return;
            }
            // * Store Data To Send Back To Client
            const response = [];

            // * Loop Through Results to Store Relevant Data in an Object
            roomUsers.forEach(friends => {
                let userParsed = {
                    username: friends.username,
                    firstName: friends.firstName,
                    lastName: friends.lastName,
                    imageSrc: friends.imageSrc,
                    friendId: friends._id,
                    status: friends.status
                };
                // console.log(userParsed);

                // *** Push Each Result to response
                response.push(userParsed);
            });

            // ** Send Filtered Response to Client
            // console.log({ response });
            res.json({ success: true, retUsers: response });
        } catch (err) {
            console.log('/api/room/users: ', err);
        }
    });

// gathers rooms based on publicRoomId
router
    .route('/:id')
    .post((req, res) => {
        Room
            .findOne({ publicRoomId: req.body.publicRoomId })
            .then(data => {
                res.json({ success: true, data });
            })
            .catch(err => {
                res.json({ success: false } + err);
            });
    });



module.exports = router;