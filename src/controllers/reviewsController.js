import { Review } from '../models/review.js';

export const getReviews = async (req, res) => {
  const reviews = await Review.find();
  res.status(200).json(reviews);
};
