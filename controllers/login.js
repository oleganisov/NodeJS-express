const get = (req, res) => {
  res.render('pages/login', {
    title: 'Авторизация',
  });
};

const post = (req, res) => {
  const { email, password } = req.body;
  if (email && password) {
    res.redirect('admin');
  } else {
    res.render('pages/login', {
      title: 'Авторизация',
    });
  }
};

module.exports = { get, post };
