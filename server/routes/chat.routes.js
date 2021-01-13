const router = require('express').Router();
const { RoomChat } = require('../models');

// populates room with social spaces in the room
router
    .route('/create')
    .post((req, res) => {
        console.log(req.body);
        RoomChat
            .create({
                message: req.body.message,
                roomId: req.body.roomId,
                userId: req.body.userId
            })
            .then(data => {
                res.json({ success: true, data });
            })
            .catch(err => {
                res.json({ success: false } + err);
            });
    });

module.exports = router;