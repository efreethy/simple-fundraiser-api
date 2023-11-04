#!/usr/bin/env node

import app from './app';
import db from './db';

import debug from 'debug';
const debugLog = debug('express-sequelize');
debugLog('AA');
import http from 'http';

const PORT: number | string = normalizePort(process.env.PORT || '4001');
app.set('port', PORT);

const server = http.createServer(app);

db.sequelize.sync().then(() => {
  server.listen(PORT, () => debugLog('Express server listening on port ' + server.address().port));
  server.on('error', onError);
  server.on('listening', onListening);
});

function normalizePort(val: string): number | string {
  const port: number = parseInt(val, 10);

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

function onError(error: NodeJS.ErrnoException): void {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind: string = typeof PORT === 'string'
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

function onListening(): void {
  const addr = server.address();
  const bind: string = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debugLog('Listening on ' + bind);
}