const express = require('express');
const router = express.Router();

const home = require('../controllers/home');
const admin = require('../controllers/admin');
const login = require('../controllers/login');

router.get('/', home.get);
router.post('/', home.post);

router.get('/admin', admin.get);
router.post('/admin/upload', admin.upload);
router.post('/admin/skills', admin.post);

router.get('/login', login.get);
router.post('/login', login.post);

module.exports = router;
