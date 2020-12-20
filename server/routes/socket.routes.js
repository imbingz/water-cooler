const router = require('express').Router();
const socketClient = require('socket.io-client');
const socket = socketClient('http://localhost:8080');
socket.on('newConnection', (data) => {
    console.log(data);
});
const db = require('../models');

router
    .route('/')
    .post((req, res) => {
        db
            .find({})
            .then(data => {
                res.json({ success: true, data });
            })
            .catch(err => {
                res.json({ success: false } + err);
            })
    })

module.exports = router;