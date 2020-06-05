const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const db = require('./db.js');
const pws = require('../libs/password');

let email = '';
let hash = '';
let salt = '';
let password = {};

rl.question('e-mail: ', (answer) => {
  email = answer;
  rl.question('password: ', (answer) => {
    password = pws.setPassword(answer);
    hash = password.hash;
    salt = password.salt;
    rl.close();
  });
});

rl.on('close', () => {
  db.saveUser({ email, hash, salt });
});
