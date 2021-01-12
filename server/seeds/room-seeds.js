require('../config/db')();

const db = require('../models');

db.Room.insertMany([
    {
        roomName: 'Room Name One',
        publicRoomId: 'someString',
        roomUsers: ['5ff7c5efc65f41328409a389', '5ff7c5efc65f41328409a38a'],
        roomCreator: '5ff7c5efc65f41328409a388',
        roomImg: 'assets/images/roomImg/cafe-doubled.png',
        roomDesc: 'This is room description one',
        socialSpaces: [],
    }, 
    {
        roomName: 'Room Name Two',
        publicRoomId: 'someString',
        roomUsers: ['5ff7c5efc65f41328409a389', '5ff7c5efc65f41328409a38a'],
        roomCreator: '5ff7c5efc65f41328409a388',
        roomImg: 'assets/images/roomImg/cafe-doubled.png',
        roomDesc: 'This is room description Two',
        socialSpaces: [],
    },
    {
        roomName: 'Room Name Three',
        publicRoomId: 'someString',
        roomUsers: ['5ff7c5efc65f41328409a389', '5ff7c5efc65f41328409a38a'],
        roomCreator: '5ff7c5efc65f41328409a388',
        roomImg: 'assets/images/roomImg/cafe-doubled.png',
        roomDesc: 'This is room description Three',
        socialSpaces: [],
    }
    
]);