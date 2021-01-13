const mongoose = require('mongoose');
const User = require('../models/users');
const { setupDB } = require('./test-setup');

const userData = {
    email: 'oceanofstorms@moon.com',
    password: '1234',
    username: 'Scrota',
    firstName: 'Crota',
    lastName: 'Oryx',
    status: 0,
    inboundPendingRooms: [],
    inboundPendingFriends: [],
    outboundPendingFriends: [],
    friends: [],
    blocked: [],
    imageSrc: 'https://cdn130.picsart.com/246483773027202.jpg?type=webp&to=crop&r=256',
};

setupDB('wc_seed_test', true);

describe('User Model Test', () => {

    // Test Schema is working!!!
    it('should return users with hashed password', async (done) => {
        const users = await User.find({});
        expect(users.length).toBe(3);
    
        // // Make sure password is hashed
        const firstUser = users[0];
        const isCorrectlyHashed = await firstUser.isValidPassword('1234');
        // console.log(isCorrectlyHashed);
        expect(isCorrectlyHashed).toBe(true);
    
        done();
    });

    it('should create & save a new user succssfully with correct fields and cases', async (done) => {
        const newUser = new User(userData);
        const savedUser = await newUser.save();
        // Object Id should be defined when successfully saved to db 
        expect(savedUser._id).toBeDefined();
        expect(savedUser.username).toBe(userData.username.toLowerCase());
        expect(savedUser.firstName).toBe(userData.firstName.toLowerCase());
        expect(savedUser.lastName).toBe(userData.lastName.toLowerCase());
        expect(savedUser.email).toBe(userData.email.toLowerCase());
        expect(savedUser.imageSrc).toBe(userData.imageSrc);
        expect(savedUser.status).toBeFalsy();
        expect(savedUser.friends.length).toBe(0);
        expect(savedUser.inboundPendingRooms.length).toBe(0);
        expect(savedUser.inboundPendingFriends.length).toBe(0);
        expect(savedUser.outboundPendingFriends.length).toBe(0);
       
        done();
    });

    // Test Validation is working!!!
    // It should us told us the errors about required password field.
    it('create user without required field should failed', async (done) => {
        const userWithoutRequiredField = new User({ username: 'TekLoon', email: 'test@test.com' });

        let err;
        try {
            const savedUserWithoutRequiredField = await userWithoutRequiredField.save();
            error = savedUserWithoutRequiredField;
        } catch (error) {
            err = error;
        }
        expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
        expect(err.errors.password.message).toBe('Password is required');

        done();
    });

});
