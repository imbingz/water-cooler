const router = require('express').Router();

router
    .route('/id')
    .post((req, res) => {
        console.log('test');
    });

module.exports = router;