exports.getChat = (req, res, next) => {
  res.status(200).render('chat', {
    title: 'Chat',
  });
};
