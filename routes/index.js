const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const router = express.Router();

router.get('/profile', isLoggedIn, (req, res) => {
  res.render('profile', {
    head : "안녕하세요?",
    text : `${req.user} 님!`
  })
});

router.get('/login', isNotLoggedIn, (req, res) => {
  res.render('login');
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

module.exports = router;
