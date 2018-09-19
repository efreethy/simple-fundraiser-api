import express from 'express';
import path from 'path';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import accounts  from './api/routes/accounts';
import ApiError from './api/errors';
require('express-joi-validation')({ passError: true })

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/accounts', accounts);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
// no stacktraces leaked to user unless in development environment
app.use((err, _, res, __) => {
  res.status(err.status || 500);
  
  let error = err;
  if (err.error.isJoi) {
    error = new ApiError.ValidationError({ message: err.error.details[0].message });
  }
  if (app.get('env') === 'development')  {
    res.json(error);
  } else {
    res.json({ code: error.code, message: error.message })
  }s
});


module.exports = app;
