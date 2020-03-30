const kakaoStrategy = require('passport-kakao').Strategy;

const { userInfo } = require('../models');

module.exports = (passport) => {
    passport.use(new kakaoStrategy({
        clientID : process.env.KAKAO_ID,
        clientSecret : process.env.COOKIE_SECRET,
        callbackURL : process.env.CALLBACK_DEBUG
    }, async (accessToken, refreshToken, profile, done) => {
        try {
            const exUser = await userInfo.findOne({ where : { snsId : profile.id, provider : 'kakao'}});
            if(exUser) {
                done(null, exUser);
            } else {
                const newUser = await userInfo.create({
                    email : profile._json && profile._json.kakao_account.email,
                    nickname : profile.displayName,
                    myCar : '선택안함',
                    snsId : profile.id,
                    provider : 'kakao'
                });
                done(null, newUser);
            }
        } catch (error) {
            console.error(error);
            done(error);
        }
    }));
}