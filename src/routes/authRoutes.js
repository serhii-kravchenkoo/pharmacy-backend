import { celebrate } from 'celebrate';
import { registerUserSchema } from '../validations/authValidation';
import { registerUser } from '../controllers/authController';
import { Router } from 'express';

const router = Router();

router.post('/api/user/register', celebrate(registerUserSchema), registerUser);

export default router;
