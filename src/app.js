import path from 'path';

import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import express from 'express';
import logger from 'morgan';

import ApiError from './api/errors';
import accounts from './api/routes/accounts';
import groups from './api/routes/groups';
import fundraisers from './api/routes/fundraisers';
import prizes from './api/routes/prizes';
import prize_programs from './api/routes/prize_programs';

require('express-joi-validation')({ passError: true })

const app = express();

app.use(require('express-promise')());
// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/accounts', accounts);
app.use('/groups', groups);
app.use('/fundraisers', fundraisers);
app.use('/prizes', prizes);
app.use('/prize_programs', prize_programs);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, _, res, __) => {
  res.status(err.status || 500);
  console.log('ERROR', err);
  let error = err;
  if (err.error && err.error.isJoi) {
    error = new ApiError.ValidationError({ message: err.error.details[0].message });
  }
  if (app.get('env') === 'development')  {
    res.json(error);
  } else {
    res.json({ code: error.code, message: error.message })
  }
});


module.exports = app;
