const Messages = require('../models/messageModel');

exports.postMessage = async (req, res) => {
  await Messages.create(req.body);
  res.redirect('/');
};
