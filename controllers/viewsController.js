const Messages = require('../models/messageModel');

exports.getRoot = (req, res) => {
  res.status(200).render('base', {
    title: 'Homepage',
  });
};

exports.getAllMessages = async (req, res) => {
  const messages = await Messages.find();
  res.status(200).render('overview', {
    title: 'Chat',
    messages,
  });
};

exports.postMessage = async (req, res) => {
  await Messages.create(req.body);
  res.redirect('/overview');
};
