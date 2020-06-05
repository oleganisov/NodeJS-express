const db = require('../model/db.js');
const pws = require('../libs/password');

const get = (req, res) => {
  if (!req.session.isAdmin) {
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
  console.log('dbuser', db.getUser(email));

  if (pws.validPassword(password)) {
    req.session.isAdmin = true;
    res.redirect('admin');
  } else {
    req.flash('msglogin', 'Неверный email или пароль!');
    res.redirect('login');
  }

  console.log(req.session.isAdmin);
};

module.exports = { get, post };
