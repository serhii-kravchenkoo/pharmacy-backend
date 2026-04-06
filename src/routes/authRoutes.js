import { celebrate } from 'celebrate';
import {
  loginUserSchema,
  registerUserSchema,
} from '../validations/authValidation.js';
import { loginUser, registerUser } from '../controllers/authController.js';
import { Router } from 'express';

const router = Router();

router.post('/api/user/register', celebrate(registerUserSchema), registerUser);
router.post('/api/user/login', celebrate(loginUserSchema), loginUser);
export default router;
