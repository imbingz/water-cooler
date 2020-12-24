module.exports = (req, res, next) => {
    // If the user is logged in, continue with the request to the restricted route
    if (req.sessionID) {
        return next();
    }

    return res.json({success: false, message: 'Please login first.'})
};

