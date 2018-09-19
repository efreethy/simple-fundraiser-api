#!/usr/bin/env node

import app from './app';
var debug = require('debug')('express-sequelize');
debug('AA')
var http = require('http');
import db from './db';


const PORT = normalizePort(process.env.PORT || '4001');
app.set('port', PORT);

var server = http.createServer(app);

db.sequelize.sync().then(() => {
  server.listen(PORT, () => debug('Express server listening on port ' + server.address().port));
  server.on('error', onError);
  server.on('listening', onListening);
});

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof PORT === 'string'
    ? 'Pipe ' + PORT
    : 'Port ' + PORT;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}
