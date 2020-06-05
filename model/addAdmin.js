const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const db = require('./db.js');
const pws = require('../libs/password');

let login = '';
let hash = '';
let salt = '';
let password = {};

rl.question('Login: ', (answer) => {
  login = answer;
  rl.question('Password: ', (answer) => {
    password = pws.setPassword(answer);
    hash = password.hash;
    salt = password.salt;
    rl.close();
  });
});

rl.on('close', () => {
  db.saveUser({ login, hash, salt });
});
