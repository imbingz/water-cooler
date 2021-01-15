const router = require('express').Router();
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
                socialSpaceUsers: [req.body.socialSpaceUsers.toString()]
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
        console.log('Hit /api/socialspace/invite', body);
        try {
            const pushFriendToSpace = SocialSpace
                .findOneAndUpdate(
                    { publicSocialSpaceId: body.spaceId },
                    { $addToSet: { socialSpaceUsers: body.friendId } },
                    { new: true }
                );
            console.log(pushFriendToSpace);

        } catch (err) {
            res.json({ success: false });
            console.log(err);
        }
    });

// Join A Space
router
    .route('/join')
    .put(async ({ body }, res) => {
        try {
            // ** Access User's db and Pull publicRoomID From 'inboundPendingRooms' Array
            const pullRoomFromOld = await SocialSpace
                .findOneAndUpdate(
                    { publicSocialSpaceId: body.oldPubSpaceId },
                    { $pull: { socialSpaceUsers: body.user } },
                    { new: true }
                );

            

            const pushToNew = await SocialSpace
                .findOneAndUpdate(
                    { publicRoomId: body.nextPubSpaceId },
                    {
                        $addToSet:
                            { roomUsers: body.user }
                    },
                    { new: true }

                );

            if (!pullRoomFromOld || !pushToNew) {
                res.json({ success: false });
                return;
            }

            res.json({ success: true });

        } catch (err) {
            console.log(err);
        }
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