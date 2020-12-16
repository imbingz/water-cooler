const router = require('express').Router();
const users = require('./user.routes');
const rooms = require('./room.routes');

//  api/user route
router.use('/api/user', users);
router.use('/api/room', rooms);

module.exports = router;
