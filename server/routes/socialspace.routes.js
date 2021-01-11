const router = require('express').Router();
const { SocialSpace } = require('../models');

// populates room with social spaces in the room
router
    .route('/')
    .post((req, res) => {
        SocialSpace
            .find({ publicRoomId: req.body.publicRoomId })
            .then(data => {
                res.json({ success: true, data });
            })
            .catch(err => {
                res.json({ success: false } + err);
            });
    });

// creates social space
router
    .route('/create')
    .post((req, res) => {
        SocialSpace
            .create({
                publicRoomId: req.body.publicRoomId,
                publicSocialSpaceId: req.body.publicSocialSpaceId,
                socialSpaceName: req.body.socialSpaceName
            })
            .then(data => {
                res.json({ success: true, data });
            })
            .catch(err => {
                res.json({ success: false } + err);
            });
    });

// gathers social space based on id
router
    .route('/find')
    .post((req, res) => {
        SocialSpace
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
    .post(({body}, res) => {
        SocialSpace
            .find({ _id: { $in: body.ids } })
            .then(data => {
                res.json({ success: true, data });
            })
            .catch(err => {
                res.json({ success: false } + err);
            });
    });

// gathers social space based on publicSocialSpaceID
router
    .route('/:id')
    .post((req, res) => {
        SocialSpace
            .findOne({ publicSocialSpaceId: req.body.publicSocialSpaceId })
            .then(data => {
                res.json({ success: true, data });
            })
            .catch(err => {
                res.json({ success: false } + err);
            });
    });

module.exports = router;