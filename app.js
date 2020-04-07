const createError = require('http-errors');
const https = require('https');
const express = require('express');
const path = require('path');
const fs = require('fs');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const logger = require('morgan');
const passport = require('passport');
const got = require('got');
require('dotenv').config();

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const sequelize = require('./models').sequelize;
const authRouter = require('./routes/auth');
const passportConfig = require('./passport');

const ssl_options = {
  cert : fs.readFileSync('/etc/letsencrypt/live/evstation.mongus.shop/fullchain.pem'),
  key : fs.readFileSync('/etc/letsencrypt/live/evstation.mongus.shop/privkey.pem')
}

const app = express();
sequelize.sync();
passportConfig(passport);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.set('port', process.env.PORT || 443);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
  resave : false,
  saveUninitialized : false,
  secret : process.env.COOKIE_SECRET,
  cookie : {
    httpOnly : true,
    secure : false
  }
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'test' ? err : {}; 

  // render the error page
  res.status(err.status || 500);
  res.render('error', {
    errorCode:err.status,
    errorMessage:err.message,
    user:req.user
  });
});

(async () => {
  try {
    const response = await got.get(process.env.API_LINK);
    //console.log('api data : ' + response.body);
  } catch (error) {
    console.error(error);
  }
})();

const ssl_Server = https.createServer(ssl_options).listen(443, () => {
  console.log(443, '번 포트에서 대기중');
})

// app.listen(app.get('port'), () => {
//   console.log(app.get('port'), '번 포트에서 대기중');
// });