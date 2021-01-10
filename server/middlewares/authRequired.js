module.exports = (req, res, next) => {
    // If the user is logged in, continue with the request to the restricted route
    // if (req.sessionID) {
    if (req.user) {
        // ********** DELETE LATER ****** // 
        // console.log('req.sessionID is: ', req.sessionID);

        return next();
    }

    return res.json({success: false, message: 'Please login first.'});
};

