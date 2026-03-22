import { Router } from 'express';
import { getNearest, getPharmacies } from '../controllers/storesController.js';

const router = Router();

router.get('/api/stores', getPharmacies);

router.get('/api/stores/nearest', getNearest);

export default router;
