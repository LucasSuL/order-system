const express = require('express');
const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const mongoose = require('mongoose');
const cors = require('cors');
const { Server } = require('socket.io');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

mongoose.connect('mongodb://localhost:27017/orders', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

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

  const orderSchema = new mongoose.Schema({
    tableNumber: Number,
    items: [String],
    status: String, // "pending", "preparing", "served"
  });

  const Order = mongoose.model('Order', orderSchema);

  server.use(cors());
  server.use(express.json());

  server.post('/api/orders', async (req, res) =>
  {
    try {
      const { tableNumber, items } = req.body;
      const order = new Order({ tableNumber, items, status: 'pending' });
      await order.save();
      io.emit('new-order', order); // Notify all clients about the new order
      res.status(201).json(order);
    } catch (error) {
      console.error('Error creating order:', error);
      res.status(500).send('Internal Server Error');
    }
  });

  server.get('/api/orders', async (req, res) =>
  {
    try {
      const orders = await Order.find();
      res.json(orders);
    } catch (error) {
      console.error('Error fetching orders:', error);
      res.status(500).send('Internal Server Error');
    }
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