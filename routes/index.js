const express = require('express');
const router = express.Router();
const { isAuth } = require('../libs/validation');

const home = require('../controllers/home');
const admin = require('../controllers/admin');
const login = require('../controllers/login');

router.get('/', home.get);
router.post('/', home.post);

router.get('/admin', isAuth, admin.get);
router.post('/admin/upload', isAuth, admin.upload);
router.post('/admin/skills', isAuth, admin.post);

router.get('/login', login.get);
router.post('/login', login.post);

module.exports = router;
