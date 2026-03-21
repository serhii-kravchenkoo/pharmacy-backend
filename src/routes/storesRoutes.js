import { Router } from 'express';
import { Pharmacy } from '../models/pharmacy.js';
import { Nearest } from '../models/nearest.js';

const router = Router();

router.get('/api/stores', async (req, res) => {
  const pharmacies = await Pharmacy.find();
  res.status(200).json(pharmacies);
});

router.get('/api/stores/nearest', async (req, res) => {
  const nearest = await Nearest.find();
  res.status(200).json(nearest);
});

export default router;
