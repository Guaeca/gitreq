/**
 * Authentication Middleware
 * Verifies JWT tokens and protects routes
 */

import jwt from 'jsonwebtoken';
import { config } from '../config/index.js';
import { ApiError } from './errorHandler.js';

/**
 * Verify JWT token and authenticate user
 */
export const authenticate = async (req, res, next) => {
  try {
    // Get token from header
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new ApiError(401, 'No token provided');
    }

    const token = authHeader.substring(7); // Remove 'Bearer ' prefix

    // Verify token
    const decoded = jwt.verify(token, config.jwt.secret);

    // Attach user info to request
    req.user = {
      id: decoded.id,
      email: decoded.email,
    };

    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      next(new ApiError(401, 'Invalid token'));
    } else if (error.name === 'TokenExpiredError') {
      next(new ApiError(401, 'Token expired'));
    } else {
      next(error);
    }
  }
};

/**
 * Optional authentication - doesn't fail if no token
 */
export const optionalAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7);
      const decoded = jwt.verify(token, config.jwt.secret);

      req.user = {
        id: decoded.id,
        email: decoded.email,
      };
    }

    next();
  } catch (error) {
    // Continue without authentication
    next();
  }
};
