const express = require('express');
const passport = require('passport');
const bcrypt = require('bcryptjs');

const { isLoggedIn, isNotLoggedIn } = require('../routes/middlewares');
const { userInfo } = require('../models');

const join = (isNotLoggedIn, async (req, res, next) => {
    const { email, password, nickname, myCar } = req.body;
    try {
        const exUser = await userInfo.findOne({ where: { email } });
        if (exUser) {
            req.flash('joinError', '이미 가입된 메일 입니다.');
            return res.redirect('/join');
        }
        const hash = await bcrypt.hash(password, 12);
        await userInfo.create({
            email,
            password: hash,
            nickname,
            myCar
        });
        return res.redirect('/');

    } catch (error) {
        console.error(error);
        return next(error);
    }
});

const login = (isLoggedIn, (req, res, next) => {
    passport.authenticate('local', (authError, user, info) => {
        if (authError) {
            console.error(authError);
            return next(authError);
        }
        if (!user) {
            req.session.valid = false;
            return res.redirect('/login');
        }
        return req.login(user, (loginError) => {
            if (loginError) {
                console.error(loginError);
                return next(loginError);
            }
            req.session.valid = true;
            return res.redirect('/');
        });
    })(req, res, next);
});

const logout = (isLoggedIn, (req, res) => {
    req.logout();
    req.session.destroy();
    res.redirect('/');
});

const kakaoLogin = (isNotLoggedIn, passport.authenticate('kakao', {
    failureRedirect: '/login'
}), (req, res) => {
    res.redirect('/');
    console.log('kakao login success');
});


const edit = (isLoggedIn, async (req, res, next) => {
    const { email, password, nickname, myCar, id } = req.body;
    try {
        let hash = '';
        if (password !== '') {
            hash = await bcrypt.hash(password, 12);
        }
        await userInfo.update({
            email: email,
            password: hash,
            nickname: nickname,
            myCar: myCar
        }, { where: { id } });
        return res.redirect('/');
    } catch (error) {
        console.error(error);
        return next(error);
    }
});

const authDelete = (isLoggedIn, (req, res) => {
    res.render('authDelete', {
        user: req.user,
        error: req.session.valid
    });
})

const authDeleteConfirm = (isLoggedIn, async (req, res, next) => {
    const { id, password } = req.body;
    try {
        const user = await userInfo.findOne({ where: { id } });
        const result = await bcrypt.compare(password, user.password);
        if (!result) {
            req.session.valid = false;
            return res.redirect('/auth/delete')
        }
        await userInfo.update({
            email: '',
            password: '',
            nickname: '탈퇴한 유저'
        }, { where : { id } });
        req.logout();
        req.session.destroy();
        return res.redirect('/');
    } catch (error) {
        console.error(error);
        return next(error);
    }
})

module.exports = {
    join,
    login,
    logout,
    kakaoLogin,
    edit,
    authDelete,
    authDeleteConfirm
}