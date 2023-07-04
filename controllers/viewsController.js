exports.getChat = (req, res) => {
  res.status(200).render('chat', {
    title: 'Chat',
  });
};

exports.login = (req, res) => {
  res.status(200).render('login', {
    title: 'Log In',
  });
};
