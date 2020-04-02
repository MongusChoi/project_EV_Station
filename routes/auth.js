const express = require('express');
const passport = require('passport');
const bcrypt = require('bcryptjs');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const { userInfo } = require('../models');

const router = express.Router();

router.post('/join', isNotLoggedIn, async (req, res, next) => {
    const { email, password, nickname, myCar } = req.body;
    try {
        const exUser = await userInfo.findOne({ where : { email } });
        if(exUser) {
            req.flash('joinError', '이미 가입된 메일 입니다.');
            return res.redirect('/join');
        }
    const hash = await bcrypt.hash(password, 12);
    await userInfo.create({
        email,
        password : hash,
        nickname,
        myCar
    });
    return res.redirect('/');

    } catch (error) {
        console.error(error);
        return next(error);
    }
});

router.post('/login', isNotLoggedIn, (req, res, next) => {
    passport.authenticate('local', (authError, user, info) => {
        if(authError) {
            console.error(authError);
            return next(authError);
        }
        if(!user) {
            req.flash('loginError', info.message);
            return res.redirect('/login');
        }
        return req.login(user, (loginError) => {
            if(loginError) {
                console.error(loginError);
                return next(loginError);
            }
            return res.redirect('/');
        });
    })(req, res, next);
});

router.get('/logout', isLoggedIn, (req, res) => {
    req.logout();
    req.session.destroy();
    res.redirect('/');
});

router.get('/kakao', passport.authenticate('kakao', {
    failureRedirect : '/'
}), (req, res) => {
    res.redirect('/');
});

router.post('/edit', isLoggedIn, async (req, res, next) => {
    const { email, password, nickname, myCar, id } = req.body;
    try{
        let hash = '';
        if(password !== ''){ 
            hash = await bcrypt.hash(password, 12); 
        }
        await userInfo.update({
            email : email,
            password : hash,
            nickname : nickname,
            myCar : myCar
        }, { where : { id } });
        return res.redirect('/');
    } catch(error) {
        console.error(error);
        return next(error);
    }
})

module.exports = router;