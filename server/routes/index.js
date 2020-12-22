const router = require('express').Router();
const users = require('./user.routes');
// const auth = require('./auth.route');
const rooms = require('./room.routes');
const socialSpaces = require('./socialspace.routes');


router.use('/api/user', users);
// router.use('/api/user', auth); // ===> parallel with users
router.use('/api/room', rooms);
router.use('/api/socialspace', socialSpaces);

module.exports = router;
