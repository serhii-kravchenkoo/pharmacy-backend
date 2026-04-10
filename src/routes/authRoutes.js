import { celebrate } from 'celebrate';
import {
  loginUserSchema,
  registerUserSchema,
} from '../validations/authValidation.js';
import {
  getUserInfo,
  loginUser,
  logoutUser,
  refreshUserSession,
  registerUser,
} from '../controllers/authController.js';
import { Router } from 'express';
import { authenticate } from '../middleware/authenticate.js';

const router = Router();

router.post('/api/user/register', celebrate(registerUserSchema), registerUser);
router.post('/api/user/login', celebrate(loginUserSchema), loginUser);
router.post('/api/user/logout', authenticate, logoutUser);
router.get('/api/user/user-info', authenticate, getUserInfo);
router.post('/api/user/refresh', authenticate, refreshUserSession);
export default router;
