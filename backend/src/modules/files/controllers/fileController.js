/**
 * File Controller
 * Handles HTTP requests for files
 */

import { validationResult } from 'express-validator';
import FileService from '../services/fileService.js';
import { ApiError } from '../../../middleware/errorHandler.js';

export class FileController {
  /**
   * Create a new file
   */
  static async createFile(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        throw new ApiError(400, 'Validation error', true, JSON.stringify(errors.array()));
      }

      const { name, content, type, projectId } = req.body;
      const userId = req.user.id;

      const file = await FileService.createFile({ name, content, type, projectId, userId });

      res.status(201).json({
        success: true,
        data: file,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get all files for a project
   */
  static async getProjectFiles(req, res, next) {
    try {
      const { projectId } = req.params;
      const userId = req.user.id;
      const { limit, offset, type } = req.query;

      const files = await FileService.getProjectFiles(projectId, userId, {
        limit: parseInt(limit) || 100,
        offset: parseInt(offset) || 0,
        type,
      });

      res.status(200).json({
        success: true,
        data: files,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get file by ID
   */
  static async getFile(req, res, next) {
    try {
      const { id } = req.params;
      const userId = req.user.id;

      const file = await FileService.getFileById(id, userId);

      res.status(200).json({
        success: true,
        data: file,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Update file
   */
  static async updateFile(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        throw new ApiError(400, 'Validation error', true, JSON.stringify(errors.array()));
      }

      const { id } = req.params;
      const userId = req.user.id;
      const updates = req.body;

      const file = await FileService.updateFile(id, userId, updates);

      res.status(200).json({
        success: true,
        data: file,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Delete file
   */
  static async deleteFile(req, res, next) {
    try {
      const { id } = req.params;
      const userId = req.user.id;

      const result = await FileService.deleteFile(id, userId);

      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default FileController;
