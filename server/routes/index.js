const router = require('express').Router();

const auth = require('./auth.routes');
router.use('/api/user', auth); // ===> authenticated parallel with users


// const users = require('./user.routes'); //=====> un-authenticated routes
// router.use('/api/user', users);

const friends = require('./friends.routes');
const rooms = require('./room.routes');
const socialSpaces = require('./socialspace.routes');
const sockets = require('./socket.routes');
const chats = require('./chat.routes');

router. use('/api/friends', friends);
// api/room route
router.use('/api/room', rooms);
// api/social space route
router.use('/api/socialspace', socialSpaces);
router.use('/api/socket', sockets);
router.use('/api/chat', chats);

module.exports = router;