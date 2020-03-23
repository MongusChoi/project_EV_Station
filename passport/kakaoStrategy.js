const kakaoStrategy = require('passport-kakao').Strategy;

const { userInfo } = require('../models');

module.exports = (passport) => {
    passport.use(new kakaoStrategy({
        clientID : process.env.KAKAO_ID,
        callbackURL : '/auth/kakao'
    }, async (accessToken, refreshToken, profile, done) => {
        try {
            const exUser = await userInfo.findOne({ where : { snsId : profile.id, provider : 'kakao'}});
            if(exUser) {
                done(null, exUser);
            } else {
                const newUser = await userInfo.create({
                    email : profile._json && profile._json.kaccount_email,
                    nick : profile.displayName,
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