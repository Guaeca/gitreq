/**
 * Project Controller
 * Handles HTTP requests for projects
 */

import { validationResult } from 'express-validator';
import ProjectService from '../services/projectService.js';
import { ApiError } from '../../../middleware/errorHandler.js';

export class ProjectController {
  /**
   * Create a new project
   */
  static async createProject(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        throw new ApiError(400, 'Validation error', true, JSON.stringify(errors.array()));
      }

      const { name, description } = req.body;
      const userId = req.user.id;

      const project = await ProjectService.createProject({ name, description, userId });

      res.status(201).json({
        success: true,
        data: project,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get all projects for current user
   */
  static async getUserProjects(req, res, next) {
    try {
      const userId = req.user.id;
      const { limit, offset } = req.query;

      const projects = await ProjectService.getUserProjects(userId, {
        limit: parseInt(limit) || 50,
        offset: parseInt(offset) || 0,
      });

      res.status(200).json({
        success: true,
        data: projects,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get project by ID
   */
  static async getProject(req, res, next) {
    try {
      const { id } = req.params;
      const userId = req.user.id;

      const project = await ProjectService.getProjectById(id, userId);

      res.status(200).json({
        success: true,
        data: project,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Update project
   */
  static async updateProject(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        throw new ApiError(400, 'Validation error', true, JSON.stringify(errors.array()));
      }

      const { id } = req.params;
      const userId = req.user.id;
      const updates = req.body;

      const project = await ProjectService.updateProject(id, userId, updates);

      res.status(200).json({
        success: true,
        data: project,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Delete project
   */
  static async deleteProject(req, res, next) {
    try {
      const { id } = req.params;
      const userId = req.user.id;

      const result = await ProjectService.deleteProject(id, userId);

      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default ProjectController;
