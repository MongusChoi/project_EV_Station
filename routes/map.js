const express = require('express');
const mapController = require('../controllers/map');
const router = express.Router();

const { isLoggedIn, isNotLoggedIn } = require('./middlewares');

router.get('/', isLoggedIn, mapController.mapInit);
router.get('/detail', isLoggedIn, mapController.detail);

module.exports = router;