require('dotenv').config();
const express = require('express');
const routes = require('./routes');
const path = require('path');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST']
    }
});
require('./config/db')();

const PORT = process.env.PORT || 5000;
const socketPORT = 8080;

// parsing middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

io.on('connection', (socket) => {
    console.log('new client connected');
    socket.emit('newConnection', 'backend connected');
});

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../client/build/index.html'));
    });
}

app.listen(PORT, () => {
    console.log('app running on PORT: ' + PORT);
});

http.listen(socketPORT, () => {
    console.log('socket is running on port: ' + socketPORT)
});