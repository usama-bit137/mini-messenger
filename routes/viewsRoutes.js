const express = require('express');
const controller = require('../controllers/viewsController');

const router = express.Router();

router
  .get('/overview', controller.getAllMessages)
  .post('/', controller.postMessage);

module.exports = router;
