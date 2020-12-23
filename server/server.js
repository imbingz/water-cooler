require('dotenv').config({ path: __dirname + '/.env' });
const express = require('express');
const routes = require('./routes');
const path = require('path');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

require('./config/db')();

const PORT = process.env.PORT || 5000;

// parsing middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

io.on('connect', (socket) => {
    socket.on('new-user', (roomUrlId, name) => {
        socket.join(roomUrlId)
        socket.room = roomUrlId;
        socket.to(socket.room).broadcast.emit('user-connected', roomUrlId, name);
    })

    socket.on('send-chat-message', (roomUrlId, name, messageInput) => {
        socket.to(socket.room).emit('receive-sent-message', roomUrlId, name, messageInput)
    })

    socket.on('check-room', (roomUrlId, name) => {
        if (roomUrlId === socket.room) {
            return;
        } else {
            socket.leave(socket.room);
            socket.join(roomUrlId);
            socket.room = roomUrlId;
            socket.to(socket.room).broadcast.emit('user-connected', roomUrlId, name);
        }
    })

    socket.on('disconnect', () => {
        socket.to(socket.room).broadcast.emit('user-disconnected');
    })
});

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../client/build/index.html'));
    });
}

http.listen(PORT, () => {
    console.log('Server is running on PORT: ' + PORT)
});