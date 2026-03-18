import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import 'dotenv/config';
import { connectMongoDB } from './db/connectMongoDB.js';
import { Pharmacy } from './models/pharmacy.js';
import { Review } from './models/review.js';
import { Product } from './models/product.js';
import { Nearest } from './models/nearest.js';
import { Cart } from './models/cart.js';

const app = express();
// Використовуємо значення з .env або дефолтний порт 3000
const PORT = process.env.PORT ?? 3000;

// Middleware
app.use(express.json());
app.use(cors());
app.use(express.json());
app.use(cors());
app.use(
  pino({
    level: 'info',
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: true,
        translateTime: 'HH:MM:ss',
        ignore: 'pid,hostname',
        messageFormat:
          '{req.method} {req.url} {res.statusCode} - {responseTime}ms',
        hideObject: true,
      },
    },
  }),
);

app.get('/api/customer-reviews', async (req, res) => {
  const reviews = await Review.find();
  res.status(200).json(reviews);
});

app.get('/api/stores', async (req, res) => {
  const pharmacies = await Pharmacy.find();
  res.status(200).json(pharmacies);
});

app.get('/api/stores/nearest', async (req, res) => {
  const nearest = await Nearest.find();
  res.status(200).json(nearest);
});

app.get('/api/products', async (req, res) => {
  const products = await Product.find();
  res.status(200).json(products);
});

app.get('/api/products/:id', async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);

  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }

  res.status(200).json(product);
});

app.get('/api/cart', async (req, res) => {
  const cart = await Cart.findOne({ userId: req.user.id });
  res.status(200).json(cart);
});

app.put('/api/cart/update', async (req, res) => {
  const { productId, quantity } = req.body;

  const cart = await Cart.findOne({ userId: req.user.id });

  const item = cart.items.find(
    (item) => item.productId.toString() === productId,
  );

  if (!item) {
    return res.status(404).json({ message: 'Item not found in cart' });
  }

  item.quantity = quantity;

  await cart.save();

  res.status(200).json(cart);
});

app.post('/api/cart/checkout', async (req, res) => {
  const cart = await Cart.findOne({ userId: req.user.id });

  if (!cart || cart.items.length === 0) {
    return res.status(400).json({ message: 'Cart is empty' });
  }

  // тут зазвичай створюється Order
  // const order = await Order.create(...)

  cart.items = [];
  await cart.save();

  res.status(200).json({ message: 'Checkout successful' });
});

// Middleware 404 (після всіх маршрутів)
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Middleware для обробки помилок
app.use((err, req, res, next) => {
  console.error(err);

  const isProd = process.env.NODE_ENV === 'production';

  res.status(500).json({
    message: isProd
      ? 'Something went wrong. Please try again later.'
      : err.message,
  });
});

// підключення до MongoDB
await connectMongoDB();

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
