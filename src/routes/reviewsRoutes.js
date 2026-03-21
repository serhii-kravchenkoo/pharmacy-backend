import { Router } from 'express';
import { Review } from '../models/review.js';
const router = Router();

router.get('/api/customer-reviews', async (req, res) => {
  const reviews = await Review.find();
  res.status(200).json(reviews);
});

export default router;
