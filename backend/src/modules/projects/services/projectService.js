/**
 * Project Service
 * Business logic for project operations
 */

import Project from '../models/Project.js';
import { ApiError } from '../../../middleware/errorHandler.js';

export class ProjectService {
  /**
   * Create a new project
   */
  static async createProject({ name, description, userId }) {
    const project = await Project.create({ name, description, userId });
    return project;
  }

  /**
   * Get all projects for a user
   */
  static async getUserProjects(userId, options = {}) {
    const projects = await Project.findByUserId(userId, options);
    return projects;
  }

  /**
   * Get project by ID
   */
  static async getProjectById(projectId, userId) {
    const project = await Project.findById(projectId);

    if (!project) {
      throw new ApiError(404, 'Project not found');
    }

    // Check if user has access to this project
    if (project.owner_id !== userId) {
      throw new ApiError(403, 'Access denied');
    }

    return project;
  }

  /**
   * Update project
   */
  static async updateProject(projectId, userId, updates) {
    // Verify ownership
    const isOwner = await Project.isOwner(projectId, userId);
    if (!isOwner) {
      throw new ApiError(403, 'Access denied');
    }

    const project = await Project.update(projectId, updates);

    if (!project) {
      throw new ApiError(404, 'Project not found');
    }

    return project;
  }

  /**
   * Delete project
   */
  static async deleteProject(projectId, userId) {
    // Verify ownership
    const isOwner = await Project.isOwner(projectId, userId);
    if (!isOwner) {
      throw new ApiError(403, 'Access denied');
    }

    const project = await Project.delete(projectId);

    if (!project) {
      throw new ApiError(404, 'Project not found');
    }

    return { message: 'Project deleted successfully' };
  }
}

export default ProjectService;
