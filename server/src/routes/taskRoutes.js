import express from 'express';
import { body } from 'express-validator';
import * as taskController from '../controllers/taskController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { validateRequest } from '../middleware/validate.js';

const router = express.Router();

router.get('/', authMiddleware, taskController.getTasks);

router.get('/stats', authMiddleware, taskController.getTaskStats);

router.get('/:id', authMiddleware, taskController.getTaskById);

router.post(
  '/',
  authMiddleware,
  [
    body('title').trim().notEmpty().withMessage('Title is required'),
    body('status')
      .optional()
      .isIn(['pending', 'in-progress', 'completed'])
      .withMessage('Invalid status'),
    body('priority')
      .optional()
      .isIn(['low', 'medium', 'high'])
      .withMessage('Invalid priority'),
  ],
  validateRequest,
  taskController.createTask
);

router.put(
  '/:id',
  authMiddleware,
  [
    body('status')
      .optional()
      .isIn(['pending', 'in-progress', 'completed'])
      .withMessage('Invalid status'),
    body('priority')
      .optional()
      .isIn(['low', 'medium', 'high'])
      .withMessage('Invalid priority'),
  ],
  validateRequest,
  taskController.updateTask
);

router.delete('/:id', authMiddleware, taskController.deleteTask);

export default router;
