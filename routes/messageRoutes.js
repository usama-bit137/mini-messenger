const express = require('express');
const controller = require('../controllers/messageController');

const router = express.Router();

router.route('/').get(controller.getAllMessages).post(controller.postMessage);
// router
//   .route('/:id')
//   .get(controller.getOneMessage)
//   .patch(controller.updateMessage)
//   .delete(controller.deleteMessage);

module.exports = router;
