const Messages = require('../models/messageModel');
// this was just for DB testing on Postman!
exports.getAllMessages = async (req, res) => {
  const messages = await Messages.find();
  res.status(200).json({
    status: 'success',
    data: {
      messages,
    },
  });
};

exports.postMessage = async (req, res) => {
  const message = await Messages.create(req.body);
  res.status(201).send({
    status: 'success',
    data: {
      message,
    },
  });
};
