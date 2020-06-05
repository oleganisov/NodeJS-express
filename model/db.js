const low = require('lowdb');
const path = require('path');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync(path.join(__dirname, 'db.json'));
const db = low(adapter);

// Set some defaults
const init = () => {
  db.defaults({
    skills: [
      { id: 'age', number: 13, text: 'Возраст начала занятий на скрипке' },
      { id: 'concerts', number: 76, text: 'Концертов отыграл' },
      { id: 'cities', number: 30, text: 'Максимальное число городов в туре' },
      { id: 'years', number: 20, text: 'Лет на сцене в качестве скрипача' },
    ],
    products: [
      {
        id: 1,
        src: './assets/img/products/Work1.jpg',
        name: 'Вино вдохновение',
        price: 600,
      },
      {
        id: 2,
        src: './assets/img/products/Work2.jpg',
        name: 'Вино вдохновение',
        price: 601,
      },
      {
        id: 3,
        src: './assets/img/products/Work3.jpg',
        name: 'Вино вдохновение',
        price: 602,
      },
      {
        id: 4,
        src: './assets/img/products/Work4.jpg',
        name: 'Вино вдохновение',
        price: 603,
      },
      {
        id: 5,
        src: './assets/img/products/Work5.jpg',
        name: 'Вино вдохновение',
        price: 604,
      },
      {
        id: 6,
        src: './assets/img/products/Work6.jpg',
        name: 'Вино вдохновение',
        price: 605,
      },
      {
        id: 7,
        src: './assets/img/products/Work7.jpg',
        name: 'Вино вдохновение',
        price: 606,
      },
      {
        id: 8,
        src: './assets/img/products/Work8.jpg',
        name: 'Вино вдохновение',
        price: 607,
      },
      {
        id: 9,
        src: './assets/img/products/Work9.jpg',
        name: 'Вино вдохновение',
        price: 608,
      },
    ],
    user: {},
  }).write();
};

const getSkills = () => {
  return db.get('skills').value();
};
const getProducts = () => {
  return db.get('products').value();
};

const updateSkills = (age, concerts, cities, years) => {
  db.get('skills').find({ id: 'age' }).assign({ number: age }).write();
  db.get('skills')
    .find({ id: 'concerts' })
    .assign({ number: concerts })
    .write();
  db.get('skills').find({ id: 'cities' }).assign({ number: cities }).write();
  db.get('skills').find({ id: 'years' }).assign({ number: years }).write();
};

const addProduct = (name, price, photo) => {
  const product = { src: photo, name, price };
  db.get('products').push(product).write;
};

const getUser = () => db.getState().user;
const saveUser = ({ login, hash, salt }) =>
  db.set('user', { login, hash, salt }).write();

module.exports = {
  init,
  getSkills,
  updateSkills,
  getProducts,
  addProduct,
  getUser,
  saveUser,
};
