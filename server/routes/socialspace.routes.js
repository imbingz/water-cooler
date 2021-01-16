const router = require('express').Router();
const { dbArray } = require('../controllers/user-arrays');
const { Room, SocialSpace } = require('../models');

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
                socialSpaceName: req.body.socialSpaceName,
                socialSpaceUsers: [req.body.user.toString()]
            })
            // ** Once Create, add _id to parent room's socialSpaces Array
            .then(space => {
                Room
                    .findOneAndUpdate(
                        { publicRoomId: req.body.publicRoomId },
                        { $addToSet: { socialSpaces: space._id } },
                        { new: true }
                    )
                    .then(room => {
                        res.json({ success: true, space, room });
                    });
            })
            .catch(err => {
                res.json({ success: false } + err);
            });
    });

// Decline Space Invite
router
    .route('/decline')
    .put(async ({ body }, res) => {
        // ** Access User's db and Pull publicRoomID From 'inboundPendingRooms' Array
        const pullID = dbArray.pull('inboundPendingSpaces', body.user, body.nextPubSpaceId);
        if (!pullID) {
            res.json({ success: false });
        }
        res.json({ success: true });
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
    .post(({ body }, res) => {
        SocialSpace
            .find({ _id: { $in: body.ids } })
            .then(data => {
                res.json({ success: true, data });
            })
            .catch(err => {
                res.json({ success: false } + err);
            });
    });

// Invite
router
    .route('/invite')
    .put(({ body }, res) => {
        // console.log('Hit /api/socialspace/invite', );
        try {
            // SocialSpace
            //     .findOneAndUpdate(
            //         { publicSocialSpaceId: body.spaceId },
            //         { $addToSet: { socialSpaceUsers: body.friendId } },
            //         { new: true }
            //     )
            dbArray.push('inboundPendingSpaces', body.friendId, body.spaceId)
                .then(data => {
                    res.json({ success: true, data });
                });

        } catch (err) {
            res.json({ success: false });
            console.log(err);
        }
    });

// Join A Space and/or Leave Current One
router
    .route('/join')
    .put(async ({ body }, res) => {
        try {
            // ** Access User's db and Pull publicRoomID From 'inboundPendingRooms' Array
            if (body.oldPubSpaceId) {
                const pullRoomFromOld = await SocialSpace
                    .findOneAndUpdate(
                        { publicSocialSpaceId: body.oldPubSpaceId },
                        { $pull: { socialSpaceUsers: body.user } },
                        { new: true }
                    );
                if (!pullRoomFromOld) {
                    res.json({ success: false });
                    return;
                }
            }

            const pushToNew = await SocialSpace
                .findOneAndUpdate(
                    { publicSocialSpaceId: body.nextPubSpaceId },
                    {
                        $addToSet:
                            { socialSpaceUsers: body.user }
                    },
                    { new: true }
                );

            if (!pushToNew) {
                res.json({ success: false });
                return;
            }

            dbArray.pull('inboundPendingSpaces', body.user, body.nextPubSpaceId);

            res.json({ success: true });

        } catch (err) {
            console.log(err);
        }
    });

// Leave Space
router
    .route('/leave')
    .put(async ({ body }, res) => {
        const pullIDFromSpace = 
        await SocialSpace
            .findOneAndUpdate(
                { publicSocialSpaceId: body.pubSpaceId },
                {
                    $pull:
                        { socialSpaceUsers: body.user }
                },
                { new: true }
            );
        if (!pullIDFromSpace) {
            res.json({ success: false });
            return;
        }
        res.json({ success: true });
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