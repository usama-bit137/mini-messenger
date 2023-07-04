const Messages = require('../models/messageModel');

exports.getAllMessages = async (req, res) => {
  const messages = await Messages.find();
  res.status(200).json({
    status: 'success',
    data: {
      messages,
    },
  });
};

exports.getMessage = (req, res) => {
  res.status(500).json({
    message: 'route not implemented yet',
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

exports.updateMessage = (req, res) => {
  res.status(500).json({
    message: 'route not implemented yet',
  });
};

exports.deleteMessage = (req, res) => {
  res.status(500).json({
    message: 'route not implemented yet',
  });
};
