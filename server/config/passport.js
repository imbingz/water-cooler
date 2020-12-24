// Import packages and modules 
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const db = require('../models');


passport.use(
    new LocalStrategy(
        { 
            usernameField: 'email' 
        }, 
        (email, password, done) => {
            // Match user
            db.User
                .findOne({email: email})
                .then(user => {
                    if (!user) {
                        return done(null, false, { message: 'That email is not registered' });
                    }

                    // Match password
                    bcrypt.compare(password, user.password, (err, isMatch) => {
                        if (err) {throw err;}
                        if (isMatch) {
                            return done(null, user);
                        } 
                        return done(null, false, { message: 'Password incorrect' });
                    
                    });
                });
        })
);

passport.serializeUser((user, cb) => {
    cb(null, user);
});

passport.deserializeUser((user, cb) => {
    cb(null, user);
});



//Export the configured passport 
module.exports = passport; 