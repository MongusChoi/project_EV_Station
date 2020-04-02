const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

const { userInfo } = require('../models');

module.exports = (passport) => {
    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    }, async (email, password, done) => {
        try {
            const exUser = await userInfo.findOne({ where: { email } });
            if (exUser) {
                const result = await bcrypt.compare(password, exUser.password);
                if (result) {
                    done(null, exUser);
                } else {
                    done(null, false, { message: 'password not corrected.' });
                }
            } else {
                done(null, false, { message: 'not sign up member. please sign up.' });
            }
        } catch(error) {
            console.error(error);
            done(error); 
        }
    }));
}