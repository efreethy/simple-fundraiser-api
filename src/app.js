import path from 'path';

import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import express from 'express';
import get from 'lodash/get';
import logger from 'morgan';

import ApiError from './api/errors';
import accounts from './api/routes/accounts';
import groups from './api/routes/groups';
import fundraisers from './api/routes/fundraisers';
import prizes from './api/routes/prizes';
import prize_programs from './api/routes/prize_programs';

require('express-joi-validation')({ passError: true })

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('express-promise')());
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));
// TODO app.use(favicon(__dirname + '/public/favicon.ico'));

// core resources
app.use('/accounts', accounts);
app.use('/groups', groups);
app.use('/fundraisers', fundraisers);
app.use('/prizes', prizes);
app.use('/prize_programs', prize_programs);


// 404 handler
app.use((_, __, next) => {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Error handler
app.use((err, _, res, __) => {
  let error = err;
  
  console.log(error);
  
  res.status(err.status || 500);

  if (get(error,'error.isJoi')) {
    error = new ApiError.ValidationError({ message: err.error.details[0].message });
  }
  if (app.get('env') === 'development')  {
    return res.json(error);
  } 
    
  return res.json({ code: error.code, message: error.message })
});


module.exports = app;
