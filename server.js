const { createServer } = require('http');
const next = require('next');
const { Server } = require('socket.io');
const { parse } = require('url');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  });

  const io = new Server(server);

  global.io = io;

  io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('newOrder', (order) => {
      io.emit('order', order);
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  });

  server.listen(3000, (err) => {
    if (err) throw err;
    console.log('> Ready on http://localhost:3000');
  });
});
