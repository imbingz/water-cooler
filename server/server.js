require('dotenv').config({ path: __dirname + '/.env' });
const express = require('express');
const routes = require('./routes');
const path = require('path');
const session = require('express-session');
const passport = require('./config/passport');

// const cors = require('cors');
const app = express();

require('./config/db')();

const PORT = process.env.PORT || 5000;

// app.use(cors());

// parsing middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Use express sessions 
app.use(session({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use(routes);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../client/build/index.html'));
    });
}

app.listen(PORT, () => {
    console.log('app running on PORT: ' + PORT);
});
