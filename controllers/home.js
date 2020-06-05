const db = require('../model/db');
require('dotenv').config();
const sgMail = require('@sendgrid/mail');
const mail = require('../config').mail;

const get = (req, res) => {
  res.render('pages/index', {
    title: 'Домашняя страница',
    skills: db.getSkills() || [],
    products: db.getProducts() || [],
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
  // console.log(mailTo, email);

  sgMail.setApiKey(process.env.SEND_GRID_API_KEY);
  sgMail
    .send(msg)
    .then(() => {
      res.redirect('/#feedback');
    })
    .catch((error) => {
      console.log(error.response.body);
    });
};

module.exports = { get, post };
