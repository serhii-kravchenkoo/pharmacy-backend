import { celebrate } from 'celebrate';
import {
  loginUserSchema,
  registerUserSchema,
} from '../validations/authValidation.js';
import {
  loginUser,
  logoutUser,
  refreshUserSession,
  registerUser,
} from '../controllers/authController.js';
import { Router } from 'express';

const router = Router();

router.post('/api/user/register', celebrate(registerUserSchema), registerUser);
router.post('/api/user/login', celebrate(loginUserSchema), loginUser);
router.post('/api/user/logout', logoutUser);
router.post('/api/user/refresh', refreshUserSession);
export default router;
