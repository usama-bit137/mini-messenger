const Messages = require('../models/messageModel');

exports.getAllMessages = async (req, res) => {
  const messages = await Messages.find();
  res.status(200).json({
    status: 'success',
    messages,
  });
};

exports.getMessage = (req, res) => {
  res.status(500).json({
    message: 'route not implemented yet',
  });
};

exports.postMessage = (req, res) => {
  res.status(500).json({
    message: 'route not implemented yet',
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
