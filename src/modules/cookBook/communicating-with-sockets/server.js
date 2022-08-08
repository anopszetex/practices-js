import net from 'node:net';

const HOSTNAME = 'localhost';
const PORT = 3000;

net
  .createServer(socket => {
    console.log('Client connected');

    socket.on('data', name => {
      socket.write(`Hey ${name}!`);
    });
  })
  .listen(PORT, HOSTNAME);
