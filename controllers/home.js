const db = require('../model/db');
require('dotenv').config();
const sgMail = require('@sendgrid/mail');
const mail = require('../config').mail;

const get = (req, res) => {
  res.render('pages/index', {
    title: 'Домашняя страница',
    skills: db.getSkills() || [],
    products: db.getProducts() || [],
    msgemail: req.flash('msgemail')[0],
  });
};

const post = (req, res) => {
  const { name, email, message } = req.body;
  const msg = {
    to: mail.mailTo,
    from: mail.mailFrom,
    subject: `Sending email from ${name} ${email}`,
    text: message,
  };

  sgMail.setApiKey(process.env.SEND_GRID_API_KEY);
  sgMail
    .send(msg)
    .then(() => {
      req.flash('msgemail', 'Сообщение отправлено!');
      res.redirect('/#feedback');
    })
    .catch((error) => {
      console.log(error.response.body);
    });
};

module.exports = { get, post };
