import express from 'express';
import * as userController from '../controllers/userController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/profile', authMiddleware, userController.getProfile);

router.put('/profile', authMiddleware, userController.updateProfile);

export default router;
