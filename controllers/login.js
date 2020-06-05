const db = require('../model/db.js');
const pws = require('../libs/password');

const get = (req, res) => {
  if (!req.session.isAuth) {
    res.render('pages/login', {
      title: 'Авторизация',
      msglogin: req.flash('msglogin')[0],
    });
  } else {
    res.redirect('admin');
  }
};

const post = (req, res) => {
  const { email, password } = req.body;
  const user = db.getUser(email);

  if (user.email === email && pws.validPassword(password)) {
    req.session.isAuth = true;
    res.redirect('admin');
  } else {
    req.flash('msglogin', 'Неверный email или пароль!');
    res.redirect('login');
  }
};

module.exports = { get, post };
