import { celebrate } from 'celebrate';
import { registerUserSchema } from '../validations/authValidation.js';
import { registerUser } from '../controllers/authController.js';
import { Router } from 'express';

const router = Router();

router.post('/api/user/register', celebrate(registerUserSchema), registerUser);

export default router;
