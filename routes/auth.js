const express = require('express');
const authController = require('../controllers/auth');

const router = express.Router();

router.post('/join', authController.join);
router.post('/login', authController.login);
router.get('/logout', authController.logout);
router.get('/kakao', authController.kakaoLogin);
router.post('/edit', authController.edit);
router.get('/delete', authController.authDelete);
router.post('/delete/confirm', authController.authDeleteConfirm);

module.exports = router;