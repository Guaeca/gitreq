/**
 * Project Service
 * Handles project API calls
 */

import api from './api.js';

export const projectService = {
  /**
   * Create a new project
   */
  async createProject(projectData) {
    const response = await api.post('/projects', projectData);
    return response.data;
  },

  /**
   * Get all projects for current user
   */
  async getProjects(params = {}) {
    const response = await api.get('/projects', { params });
    return response.data;
  },

  /**
   * Get project by ID
   */
  async getProject(id) {
    const response = await api.get(`/projects/${id}`);
    return response.data;
  },

  /**
   * Update project
   */
  async updateProject(id, updates) {
    const response = await api.put(`/projects/${id}`, updates);
    return response.data;
  },

  /**
   * Delete project
   */
  async deleteProject(id) {
    const response = await api.delete(`/projects/${id}`);
    return response.data;
  },
};

export default projectService;
