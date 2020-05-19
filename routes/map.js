const express = require('express');
const mapController = require('../controllers/map');
const router = express.Router();

const { isLoggedIn, isNotLoggedIn } = require('./middlewares');

router.get('/', isLoggedIn, mapController.mapInit);
router.get('/detail', isLoggedIn, mapController.detail);
router.post('/setMarker', isLoggedIn, mapController.setMarker);
router.post('/test', isLoggedIn, mapController.test);

module.exports = router;