/**
 * Authentication Routes
 * Defines API endpoints for authentication
 */

import express from 'express';
import { body } from 'express-validator';
import AuthController from '../controllers/authController.js';
import { authenticate } from '../../../middleware/authMiddleware.js';

const router = express.Router();

/**
 * POST /api/auth/register
 * Register a new user
 */
router.post(
  '/register',
  [
    body('email').isEmail().withMessage('Invalid email address'),
    body('password')
      .isLength({ min: 8 })
      .withMessage('Password must be at least 8 characters'),
    body('name').notEmpty().withMessage('Name is required'),
  ],
  AuthController.register
);

/**
 * POST /api/auth/login
 * Login user
 */
router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Invalid email address'),
    body('password').notEmpty().withMessage('Password is required'),
  ],
  AuthController.login
);

/**
 * GET /api/auth/profile
 * Get current user profile (protected route)
 */
router.get('/profile', authenticate, AuthController.getProfile);

export default router;
