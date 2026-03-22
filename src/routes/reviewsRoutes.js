import { Router } from 'express';
import { getReviews } from '../controllers/reviewsController.js';
const router = Router();

router.get('/api/customer-reviews', getReviews);

export default router;
