require('dotenv').config({ path: __dirname + '/.env' });
const express = require('express');
const routes = require('./routes');
const path = require('path');
const session = require('express-session');
const passport = require('./config/passport');

// const cors = require('cors');
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

//******************************** Alex
// const socketPORT = process.env.socketPORT || 8080;

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

io.on('connect', (socket) => {
    const id = socket.handshake.query.id;
    socket.id = id;
    console.log(socket.id);

    //******************************** Bing
    // players[socket.id] = {
    //     x: 0, y: 0
    // };
    // io.sockets.emit('state', {players});
    //********************************//
    // socket.on('new-user', (roomUrlId, name) => {
    //     socket.join(roomUrlId);
    //     socket.room = roomUrlId;
    //     socket.to(socket.room).broadcast.emit('user-connected', roomUrlId, name);
    // });

    socket.on('send-message', (roomUrlId, name, messageInput) => {
        console.log('recieve-message from server');
        socket.to(socket.room).emit('receive-message', roomUrlId, name, messageInput);
        console.log('hi fam from server');
    });

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

        //******************************** Bing
        // delete players[socket.id];
    });

    //******************************** Alex -  Bing
    // socket.on('movement', (data) => {

    //     console.log('movement called', {data});
    //     // console.log({players});
    //     if (data.x < 0) {
    //         data.x = 0;
    //     }

    //     if (data.x > 800) {
    //         data.x = 800;
    //     }

    //     if (data.y < 0) {
    //         data.y = 0;
    //     }

    //     if (data.y > 600) {
    //         data.y = 600;
    //     }

    //     players[socket.id] = data;

    //     let message; 

    //     if(players) {
    //         console.log(players);
    //         let playerPositions = Object.values(players);
    //         for (let i = 0; !message && i < playerPositions.length ; i++) {
    //             for (let j = i + 1; !message && j < playerPositions.length; j++) {
    //                 // console.log(playerPositions[i].x)
    //                 if (Math.abs( playerPositions[i].x - playerPositions[j].x ) <= 32 && Math.abs(playerPositions[i].y - playerPositions[j].y) <= 32) {
    //                     console.log('distance x: ' + Math.abs(playerPositions[i].x - playerPositions[j].x) + ' distance y: ' + Math.abs(playerPositions[i].y - playerPositions[j].y));
    //                     playerPositions[i].message = 'Hey, like to chat?'; 
    //                     playerPositions[j].message = 'Hellllloooooo , genius'; 

    //                     // socket.emit('greeting', 'Hey, like to chat?');
    //                 } 
    //             }
    //         }
    //     }

    //     // players[socket.id] = data;

    //     socket.emit('state', {players, message});

    // });
    /*********************************** */
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
