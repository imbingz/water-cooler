const router = require('express').Router();
const { uuid } = require('uuidv4')
const db = require('../models');

// populates rooms page with public rooms
router
  .route('/')
  .get((req, res) => {
    db.Room
      .find({})
      .then(data => {
        res.json({ success: true, data });
      })
      .catch(err => {
        res.json({ success: false });
      });
  });

// creates room
router
  .route('/create')
  .post((req, res) => {
    db.Room
      .create({
        name:  req.body.name,
        publicID: uuid()
      })
      .then(data => {
        res.json({ success: true, data })
      })
      .catch(err => {
        res.json({ success: false });
      });
  });

router.get('/:id', (req, res) => {
  res.render('id', { roomID: req.params.room })
})