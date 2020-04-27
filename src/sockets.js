const socketIO = require('socket.io');

let socket;

const connection = (server) => {
  const io = socketIO.listen(server);

  io.on('connection', (newSocket) => {
    socket = newSocket;
  });
};

const getSocket = () => socket;

module.exports = { connection, getSocket };
