const express = require('express');
const controller = require('../controllers/viewsController');

const router = express.Router();

router
  .get('/overview', controller.getAllMessages)
  .get('/', controller.getRoot)
  .post('/', controller.postMessage);

module.exports = router;
