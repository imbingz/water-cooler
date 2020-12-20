const router = require('express').Router();
const auth = require('./auth.route');
const rooms = require('./room.routes');
const socialSpaces = require('./socialspace.routes');
const ioRoutes = require('./socket.routes');

//  api/user route
router.use('/api/user', auth);
// api/room route
router.use('/api/room', rooms);
// api/social space route
router.use('/api/socialspace', socialSpaces);
// api/socket io  route
router.use('/api/socketio', ioRoutes);

module.exports = router;
