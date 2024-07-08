const express = require('express');
const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const cors = require('cors');
const { Server } = require('socket.io');
// const { count } = require('console');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

var allOrders = [];

app.prepare().then(() =>
{
  const server = express();
  const httpServer = createServer(server);
  const io = new Server(httpServer, {
    cors: {
      origin: '*',
    },
  });

  global.io = io;

  server.use(cors());
  server.use(express.json());



  const serverDefensive = (func) =>
  {
    try {
      func();
    }
    catch (error) {
      console.error('----------------Error creating order:', error);
      res.status(500).send('Internal Server Error');
    }
  };


  server.post('/api/orders', async (req, res) =>
  {
    serverDefensive(() =>
    {
      const { items } = req.body;
      allOrders.push(items);
      // await order.save();
      io.emit('updateKitchenOrders', allOrders);
      res.status(201).json(items);
    });
  });

  server.get('/api/orders', async (req, res) =>
  {
    serverDefensive(() =>
    {
      res.status(200).json(allOrders);
    });
  });





  io.on('connection', (socket) =>
  {
    console.log('New client connected');

    socket.on('newOrder', (order) =>
    {
      io.emit('order', order);
    });

    socket.on('disconnect', () =>
    {
      console.log('Client disconnected');
    });
  });

  server.all('*', (req, res) =>
  {
    return handle(req, res, parse(req.url, true));
  });

  const PORT = process.env.PORT || 3000;
  httpServer.listen(PORT, (err) =>
  {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${PORT}`);
  });
});