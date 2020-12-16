const router = require('express').Router();
const { Room } = require('../models');

// populates rooms page with public rooms
router
  .route('/')
  .get((req, res) => {
    Room
      .find({})
      .then(data => {
        res.json({ success: true, data });
      })
      .catch(err => {
        res.json({ success: false } + err);
      });
  })

// creates room
router
  .route('/create')
  .post((req, res) => {
    Room
      .create({
        name:  req.body.name,
        publicID: req.body.publicID
      })
      .then(data => {
        res.json({ success: true, data })
      })
      .catch(err => {
        res.json({ success: false } + err);
      });
  });

  router
  .route('/find')
  .post((req, res) => {

    Room
      .findOne({ _id: req.body.id })
      .then(data => {
        res.json({ success: true, data });
      })
      .catch(err => {
        res.json({ success: false } + err);
      });
  })

router
  .route('/:id')

module.exports = router;