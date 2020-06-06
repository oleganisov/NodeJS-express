const db = require('../model/db');
const formidable = require('formidable');
const fs = require('fs');
const path = require('path');

const get = (req, res) => {
  res.render('pages/admin', {
    title: 'Административная панель',
    skills: db.getSkills() || [],
    msgskill: req.flash('msgskill')[0],
    msgfile: req.flash('msgfile')[0],
  });
};

const post = (req, res) => {
  const { age, concerts, cities, years } = req.body;

  db.updateSkills(age, concerts, cities, years);
  req.flash('msgskill', 'Данные сохранены!');
  res.redirect('/admin');
};

const upload = (req, res, next) => {
  const upload = path.join('./public', 'upload');
  const form = formidable({ uploadDir: upload });

  form.parse(req, (err, fields, file) => {
    if (err) return next(err);

    const { name, price } = fields;
    const destPath = path.join(upload, file.photo.name);

    fs.rename(file.photo.path, destPath, (err) => {
      if (err) {
        console.log(err);
      }
    });

    db.addProduct(name, price, path.join('upload', file.photo.name));
    req.flash('msgfile', 'Товар добавлен!');
    res.redirect('/admin');
  });
};

module.exports = { get, post, upload };
