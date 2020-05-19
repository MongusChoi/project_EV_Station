const createError = require('http-errors');
const express = require('express');
const path = require('path');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const logger = require('morgan');
const passport = require('passport');
const passportConfig = require('./passport');
require('dotenv').config();
const sequelize = require('./models').sequelize;

const app = express();
sequelize.sync();
passportConfig(passport);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.set('port', process.env.PORT || 9000);

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

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const mapRouter = require('./routes/map');
const authRouter = require('./routes/auth');
const stationConfig = require('./controllers/station');

app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/users', usersRouter);
app.use('/map', mapRouter);

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

// 전기차 충전소 데이터 모듈, 데이터 삽입부분 추가
stationConfig.insert();

app.listen(app.get('port'), () => {
   console.log(app.get('port'), '번 포트에서 대기중');
});
