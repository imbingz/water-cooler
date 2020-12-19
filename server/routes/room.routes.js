const router = require('express').Router();
const { Room } = require('../models');

// populates rooms page with public rooms
router
    .route('/')
    .get((req, res) => {
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