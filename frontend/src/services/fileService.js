/**
 * File Service
 * Handles file/requirements API calls
 */

import api from './api.js';

export const fileService = {
  /**
   * Create a new file
   */
  async createFile(fileData) {
    const response = await api.post('/files', fileData);
    return response.data;
  },

  /**
   * Get all files for a project
   */
  async getProjectFiles(projectId, params = {}) {
    const response = await api.get(`/files/project/${projectId}`, { params });
    return response.data;
  },

  /**
   * Get file by ID
   */
  async getFile(id) {
    const response = await api.get(`/files/${id}`);
    return response.data;
  },

  /**
   * Update file
   */
  async updateFile(id, updates) {
    const response = await api.put(`/files/${id}`, updates);
    return response.data;
  },

  /**
   * Delete file
   */
  async deleteFile(id) {
    const response = await api.delete(`/files/${id}`);
    return response.data;
  },
};

export default fileService;
