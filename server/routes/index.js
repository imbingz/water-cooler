const router = require('express').Router();
const users = require('./user.route');

//  api/user route
router.use('/api/user', users);

module.exports = router;
