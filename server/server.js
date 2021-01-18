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


const players = {};

io.on('connection', (socket) => {

    const sessionId = socket.handshake.query.sessionId;

    socket.on('set-id', sessionId => {
        socket.id = sessionId;
    });

    socket.on('send-chat', (message, roomId, userId, username) => {
        socket.broadcast.emit('receive-chat', message, roomId, userId, username, socket.id);
    });

    socket.on('new player', player => {
        console.log(`server new player is: ${JSON.stringify(player)}`);

        players[sessionId] = {
            x: 0, y: 0, 
            username: player.username
        };

        io.sockets.emit('state', { players });

        console.log('players emit from sockets', players);
        
    });

    socket.on('movement', (data) => {

        // console.log('movement called', { data });

        // set player movement boundaries 
        if (data.x < 0) {
            data.x = 10;
        }

        if (data.x > 768) {
            data.x = 768;
        }

        if (data.y < 0) {
            data.y = 10;
        }

        if (data.y > 575) {
            data.y = 575;
        }

        // update players original position with movement data emitted from frontend 
        players[sessionId].x= data.x;
        players[sessionId].y=data.y;


        let message;

        if (players) {
            let playerPositions = Object.values(players);
            
            for (let i = 0; !message && i < playerPositions.length; i++) {
                for (let j = i + 1; !message && j < playerPositions.length; j++) {
                   
                    if (Math.abs(playerPositions[i].x - playerPositions[j].x) <= 32 && Math.abs(playerPositions[i].y - playerPositions[j].y) <= 32) {
                        playerPositions[i].message = 'Hey, like to chat?';
                        playerPositions[j].message = 'Hello, like to chat?';
                    }
                }
            }
        }

        // players is obj of each player that has x, y, username and message as property keys. send all that back to frontend to render Player ---> to Sprite
        socket.emit('state', { players });

        socket.on('disconnect', () => {
            socket.to(socket.room).broadcast.emit('user-disconnected');
            delete players[sessionId];
        });
    });   
    
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
