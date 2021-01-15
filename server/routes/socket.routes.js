const router = require('express').Router();

router
    .route('/id')
    .post((req, res) => {
        res.json({ success: true, sessionID: req.sessionID });
    });

module.exports = router;