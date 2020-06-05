const express = require('express');
const session = require('express-session');
const flash = require('connect-flash');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const db = require('./model/db');
const routes = require('./routes');
const sessionCfg = require('./config').session;

db.init();

const port = process.env.PORT || 5000;
const app = express();
// view engine setup
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'pug');

app.use(
  session({
    secret: sessionCfg.secret,
    key: sessionCfg.key,
    resave: false,
    saveUninitialized: false,
    cookie: {
      path: '/',
      httpOnly: true,
      maxAge: sessionCfg.maxAge,
    },
  })
);
app.use(flash());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', routes);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  let err = new Error('Not Found!!!');
  err.status = 404;
  next(err);
});
// error handler
app.use((err, req, res, next) => {
  // render the error page
  res.status(err.status || 500);
  res.render('error', { message: err.message, error: err });
});

app.listen(port, () => {
  const upload = path.join(__dirname, 'public', 'upload');
  fs.mkdirSync(upload, { recursive: true });

  console.log(`Server listen on port ${port}`);
});
