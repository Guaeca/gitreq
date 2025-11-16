/**
 * File Service
 * Business logic for file operations
 */

import File from '../models/File.js';
import Project from '../../projects/models/Project.js';
import { ApiError } from '../../../middleware/errorHandler.js';

export class FileService {
  /**
   * Create a new file
   */
  static async createFile({ name, content, type, projectId, userId }) {
    // Verify user owns the project
    const isOwner = await Project.isOwner(projectId, userId);
    if (!isOwner) {
      throw new ApiError(403, 'Access denied');
    }

    const file = await File.create({ name, content, type, projectId });
    return file;
  }

  /**
   * Get all files for a project
   */
  static async getProjectFiles(projectId, userId, options = {}) {
    // Verify user owns the project
    const isOwner = await Project.isOwner(projectId, userId);
    if (!isOwner) {
      throw new ApiError(403, 'Access denied');
    }

    const files = await File.findByProjectId(projectId, options);
    return files;
  }

  /**
   * Get file by ID (with content)
   */
  static async getFileById(fileId, userId) {
    // Check if user has access to this file
    const hasAccess = await File.hasAccess(fileId, userId);
    if (!hasAccess) {
      throw new ApiError(403, 'Access denied');
    }

    const file = await File.findById(fileId);

    if (!file) {
      throw new ApiError(404, 'File not found');
    }

    // Remove owner_id from response
    delete file.owner_id;

    return file;
  }

  /**
   * Update file
   */
  static async updateFile(fileId, userId, updates) {
    // Check if user has access to this file
    const hasAccess = await File.hasAccess(fileId, userId);
    if (!hasAccess) {
      throw new ApiError(403, 'Access denied');
    }

    const file = await File.update(fileId, updates);

    if (!file) {
      throw new ApiError(404, 'File not found');
    }

    return file;
  }

  /**
   * Delete file
   */
  static async deleteFile(fileId, userId) {
    // Check if user has access to this file
    const hasAccess = await File.hasAccess(fileId, userId);
    if (!hasAccess) {
      throw new ApiError(403, 'Access denied');
    }

    const file = await File.delete(fileId);

    if (!file) {
      throw new ApiError(404, 'File not found');
    }

    return { message: 'File deleted successfully' };
  }
}

export default FileService;
