require('dotenv').config();
require('./db');

const app = require('./server');
const http = require('http');
const server = http.createServer(app);

require('./sockets').connection(server);

server.listen(app.get('port'), () =>
  console.log(`Servidor en puerto ${app.get('port')}`)
);
