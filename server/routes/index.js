const router = require('express').Router();
const users = require('./user.routes');
// const auth = require('./auth.route');


//router.use('/api/user', auth); // ===> parallell with users
const rooms = require('./room.routes');
const socialSpaces = require('./socialspace.routes');
//  api/user route
router.use('/api/user', users);
router.use('/api/room', rooms);
router.use('/api/socialspace', socialSpaces);

module.exports = router;
