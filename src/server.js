import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { connectMongoDB } from './db/connectMongoDB.js';
import { logger } from './middleware/logger.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';
import reviewsRoutes from './routes/reviewsRoutes.js';
import storesRoutes from './routes/storesRoutes.js';
import productsRoutes from './routes/productsRoutes.js';
import cartRoutes from './routes/cartRoutes.js';

const app = express(); // Використовуємо значення з .env або дефолтний порт 3000
const PORT = process.env.PORT ?? 3000;

// глобальні middleware
app.use(logger);
app.use(express.json());
app.use(cors());

// підключаємо групу маршрутів
app.use(reviewsRoutes);
app.use(storesRoutes);
app.use(productsRoutes);
app.use(cartRoutes);

// Middleware 404 (після всіх маршрутів)
app.use(notFoundHandler);

// Middleware для обробки помилок
app.use(errorHandler);

// підключення до MongoDB
await connectMongoDB();

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
