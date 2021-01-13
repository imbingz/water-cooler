const express = require('express');
const app = express();
const supertest = require('supertest');
const request = supertest(app);

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.get('/test', async (req, res) => {
    res.json({ message: 'pass!' });
});
  
// Make sure jest works before using it
describe('Initial Jest Testing', () => {
    it('Testing to see if Jest works', () => {
        expect(1).toBe(1);
    });
      
    it('gets the test endpoint', async done => {
        const response = await request.get('/test');
      
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('pass!');
        done();
    });
});
