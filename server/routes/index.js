const router = require('express').Router();

const auth = require('./auth.route');
router.use('/api/user', auth); // ===> authenticated parallell with users


// const users = require('./user.routes');  //=====> un-authenticated routes
// router.use('/api/user', users);

const rooms = require('./room.routes');
const socialSpaces = require('./socialspace.routes');
const ioRoutes = require('./socket.routes');

//  api/user route


// api/room route
router.use('/api/room', rooms);
// api/social space route
router.use('/api/socialspace', socialSpaces);
// api/socket io  route
router.use('/api/socketio', ioRoutes);

module.exports = router;