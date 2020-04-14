const express = require('express');
const indexController = require('../controllers/index');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const router = express.Router();

router.get('/profile', isLoggedIn, (req, res) => {
  res.render('profile', {
    user : req.user
  })
});

router.get('/edit', isLoggedIn, (req, res, next) => {
  res.render('authEdit', {
      user : req.user
  });
});

router.get('/login', isNotLoggedIn, (req, res) => {
  res.render('login', {
    error : req.session.valid
  });
})

router.get('/join', isNotLoggedIn, (req, res) => {
  res.render('join');
})

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    user : req.user
  });
});

router.get('/map', isLoggedIn, (req, res, next) => {
  res.render('map', {
    user : req.user,
    appKey : process.env.KAKAO_MAP
  });
})

module.exports = router;
