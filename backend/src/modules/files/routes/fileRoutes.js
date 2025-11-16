/**
 * File Routes
 * Defines API endpoints for files
 */

import express from 'express';
import { body } from 'express-validator';
import FileController from '../controllers/fileController.js';
import { authenticate } from '../../../middleware/authMiddleware.js';

const router = express.Router();

// All file routes require authentication
router.use(authenticate);

/**
 * POST /api/files
 * Create a new file
 */
router.post(
  '/',
  [
    body('name').notEmpty().withMessage('File name is required'),
    body('content').notEmpty().withMessage('File content is required'),
    body('type')
      .isIn(['markdown', 'csv', 'json'])
      .withMessage('Type must be markdown, csv, or json'),
    body('projectId').notEmpty().withMessage('Project ID is required'),
  ],
  FileController.createFile
);

/**
 * GET /api/files/project/:projectId
 * Get all files for a project
 */
router.get('/project/:projectId', FileController.getProjectFiles);

/**
 * GET /api/files/:id
 * Get file by ID
 */
router.get('/:id', FileController.getFile);

/**
 * PUT /api/files/:id
 * Update file
 */
router.put(
  '/:id',
  [
    body('name').optional().notEmpty().withMessage('Name cannot be empty'),
    body('content').optional().notEmpty().withMessage('Content cannot be empty'),
    body('type')
      .optional()
      .isIn(['markdown', 'csv', 'json'])
      .withMessage('Type must be markdown, csv, or json'),
  ],
  FileController.updateFile
);

/**
 * DELETE /api/files/:id
 * Delete file
 */
router.delete('/:id', FileController.deleteFile);

export default router;
