const router = require('express').Router();

router
    .route('/id')
    .post((req, res) => {
        // console.log('THIS IS THE SOCKET ID FROM THE SOCKET ROUTE');
        // console.log(req.sessionID);
        // console.log('THIS IS THE SOCKET SESSION FROM THE SOCKET ROUTE');
        // console.log(req.sessionStore);
        
        const test = req.sessionStore.sessions;
        console.log(typeof test);
        console.log(test);
        res.json({ success: true, sessionID: req.sessionID });
    });

module.exports = router;