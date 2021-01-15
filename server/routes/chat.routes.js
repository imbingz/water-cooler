const router = require('express').Router();
const { RoomChat } = require('../models');

// populates room with social spaces in the room
router
    .route('/create')
    .post((req, res) => {
        RoomChat
            .create({
                message: req.body.message,
                roomId: req.body.roomId,
                userId: req.body.userId,
                username: req.body.username
            })
            .then(data => {
                res.json({ success: true, data });
            })
            .catch(err => {
                res.json({ success: false } + err);
            });
    });

router
    .route('/get')
    .post((req, res) => {
        RoomChat
            .find({ roomId: req.body.roomId })
            .then(data => {
                res.json({ success: true, data });
            })
            .catch(err => {
                res.json({ success: false } + err);
            });
    });

module.exports = router;