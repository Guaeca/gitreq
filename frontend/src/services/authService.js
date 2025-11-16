/**
 * Authentication Service
 * Handles authentication API calls
 */

import api from './api.js';

export const authService = {
  /**
   * Register a new user
   */
  async register(userData) {
    const response = await api.post('/auth/register', userData);
    if (response.data.data.token) {
      localStorage.setItem('authToken', response.data.data.token);
    }
    return response.data;
  },

  /**
   * Login user
   */
  async login(credentials) {
    const response = await api.post('/auth/login', credentials);
    if (response.data.data.token) {
      localStorage.setItem('authToken', response.data.data.token);
    }
    return response.data;
  },

  /**
   * Logout user
   */
  logout() {
    localStorage.removeItem('authToken');
  },

  /**
   * Get current user profile
   */
  async getProfile() {
    const response = await api.get('/auth/profile');
    return response.data;
  },

  /**
   * Check if user is authenticated
   */
  isAuthenticated() {
    return !!localStorage.getItem('authToken');
  },
};

export default authService;
