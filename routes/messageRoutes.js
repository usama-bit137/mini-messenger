const express = require('express');
const controller = require('../controllers/messageController');

const router = express.Router();
router.route('/').get(controller.getAllMessages).post(controller.postMessage);

module.exports = router;
