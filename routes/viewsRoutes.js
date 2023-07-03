const express = require('express');
const controller = require('../controllers/viewsController');

const router = express.Router();

router.get('/', (req, res, next) => {
  res.status(200).render('base', {
    title: 'Your new favourite messaging app',
  });
});

router.get('/chat', controller.getChat);

module.exports = router;
