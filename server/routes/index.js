const router = require('express').Router();
<<<<<<< HEAD
// const users = require('./user.route');
const auth = require('./auth.route');

//  api/user route
// router.use('/api/user', users);
router.use('/api/user', auth); // ===> parallell with users
=======
const users = require('./user.routes');
const rooms = require('./room.routes');
const socialSpaces = require('./socialspace.routes');
//  api/user route
router.use('/api/user', users);
router.use('/api/room', rooms);
router.use('/api/socialspace', socialSpaces);
>>>>>>> master

module.exports = router;
