const jwt = require('jsonwebtoken');
const db = require('../models');
const JWT_SECRET = process.env.JWT_SECRET;

module.exports = (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
        //401 Not Authorized
        return res.status(401).json({ error: 'you must be logged in' });
    }
    //Access the token (authorization === Bearer "given token string")
    const token = authorization.replace('Bearer ', '');
    //use jwt package to verify the token
    jwt.verify(token, JWT_SECRET, (err, payload) => {
        if (err) {
            return res.status(401).json({ error: 'you must be logged in' });
        }

        const { _id } = payload;

        db.User.findById(_id).then(userdata => {
            req.user = userdata; //allow to access user info
            // only go to next after find query
            next();
        });
    });
};
