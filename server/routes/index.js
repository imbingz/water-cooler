const router = require('express').Router();
// const users = require('./user.route');
const auth = require('./auth.route');

//  api/user route
// router.use('/api/user', users);
router.use('/api/user', auth); // ===> parallell with users

module.exports = router;
