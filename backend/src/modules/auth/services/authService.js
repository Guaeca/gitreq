/**
 * Authentication Service
 * Business logic for authentication operations
 */

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { config } from '../../../config/index.js';
import User from '../models/User.js';
import { ApiError } from '../../../middleware/errorHandler.js';

export class AuthService {
  /**
   * Register a new user
   */
  static async register({ email, password, name }) {
    // Check if user already exists
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      throw new ApiError(400, 'Email already registered');
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({ email, passwordHash, name });

    // Generate token
    const token = this.generateToken(user);

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
      token,
    };
  }

  /**
   * Login user
   */
  static async login({ email, password }) {
    // Find user
    const user = await User.findByEmail(email);
    if (!user) {
      throw new ApiError(401, 'Invalid credentials');
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password_hash);
    if (!isValidPassword) {
      throw new ApiError(401, 'Invalid credentials');
    }

    // Generate token
    const token = this.generateToken(user);

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
      token,
    };
  }

  /**
   * Get user profile
   */
  static async getProfile(userId) {
    const user = await User.findById(userId);
    if (!user) {
      throw new ApiError(404, 'User not found');
    }
    return user;
  }

  /**
   * Generate JWT token
   */
  static generateToken(user) {
    return jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      config.jwt.secret,
      {
        expiresIn: config.jwt.expiresIn,
      }
    );
  }
}

export default AuthService;
