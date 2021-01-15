require('dotenv').config({ path: __dirname + '/.env' });
const express = require('express');
const routes = require('./routes');
const path = require('path');
const session = require('express-session');
const passport = require('./config/passport');
const app = express();

const http = require('http').createServer(app);
const io = require('socket.io')(http, {
    cors: {
        origin: '/:3000',
        methods: ['GET', 'POST']
    }
});

require('./config/db')();

const PORT = process.env.PORT || 5000;

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


// const players = {};

io.on('connection', (socket) => {
    const id = socket.handshake.query.id;
    socket.id = id;

    socket.emit('set-id', id);

    socket.on('send-chat', (message, roomId, userId, username) => {
        socket.broadcast.emit('receive-chat', message, roomId, userId, username, id);
    });

    // players[socket.id] = {
    //     x: 0, y: 0
    // };

    // io.sockets.emit('state', { players });

    // socket.on('check-room', (roomUrlId, name) => {
    //     if (roomUrlId === socket.room) {
    //         return;
    //     }
    //     socket.leave(socket.room);
    //     socket.join(roomUrlId);
    //     socket.room = roomUrlId;
    //     socket.to(socket.room).broadcast.emit('user-connected', roomUrlId, name);

    // });

    socket.on('disconnect', () => {
        socket.to(socket.room).broadcast.emit('user-disconnected');
        delete players[socket.id];
    });


    // socket.on('movement', (data) => {
    //     if (data.x < 0) {
    //         data.x = 0;
    //     }
    //     if (data.x > 750) {
    //         data.x = 750;
    //     }
    //     if (data.y < 0) {
    //         data.y = 0;
    //     }
    // if (data.y > 585) {
    //     data.y = 585;
    // }
    //     players[socket.id] = data;
    //     let message;
    // players is an obj of player with random key n{ x, y }positions as value
    //     if (players) {
    //         let playerPositions = Object.values(players);
    //         for (let i = 0; !message && i < playerPositions.length; i++) {
    //             for (let j = i + 1; !message && j < playerPositions.length; j++) {

    //                 if (Math.abs(playerPositions[i].x - playerPositions[j].x) <= 32 && Math.abs(playerPositions[i].y - playerPositions[j].y) <= 32) {
    //                     playerPositions[i].message = 'Hey, like to chat?';
    //                     playerPositions[j].message = 'Hello , genius';
    //                 }
    //             }
    //         }
    //     }
    //     socket.emit('state', { players, message });
    // });
});

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../client/build/index.html'));
    });
}

http.listen(PORT, () => {
    console.log('Server is running on PORT: ' + PORT);
});
