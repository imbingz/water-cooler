const db = require('../models');
const router = require('express').Router();
const { Room, User } = require('../models');
const { dbArray } = require('../controllers/user-arrays');

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
        Room
            .create({
                roomName: req.body.roomName,
                roomDesc: req.body.roomDescription,
                publicRoomId: req.body.publicRoomId,
                roomCreator: req.body.userId
            })
            .then(data => {
                for (let i = 0; i < req.body.roomFriends.length; i++) {
                    User
                        .findByIdAndUpdate(
                            { _id: req.body.roomFriends[i] },
                            { $addToSet: { inboundPendingRooms: data.publicRoomId } }
                        )
                        .then(update => {
                            res.json({ success: true, update });
                        })
                        .catch(err => {
                            res.json({ success: false } + err);
                        });
                }
                res.json({ success: true, data });
            })
            .catch(err => {
                res.json({ success: false } + err);
            }); 
    });

// Decline Room Invite
router 
    .route('/decline')
    .post(({ body }, res) => {
        // ** Access User's db and Pull publicRoomID From 'inboundPendingRooms' Array
        dbArray.pull('inboundPendingRooms', body.user, body.pubRoomId);
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
    .route('/findmany')
    .post(({ body }, res) => {
        Room
            .find({ _id: { $in: body.ids } })
            .then(data => {
                res.json({ success: true, data });
            })
            .catch(err => {
                res.json({ success: false } + err);
            });
    });

// * Get Information of the Users in a Room
// !* { note: similar logic is in place in user.route, we could use that route instead but testing is needed } 
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