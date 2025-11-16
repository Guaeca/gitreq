/**
 * Project Routes
 * Defines API endpoints for projects
 */

import express from 'express';
import { body } from 'express-validator';
import ProjectController from '../controllers/projectController.js';
import { authenticate } from '../../../middleware/authMiddleware.js';

const router = express.Router();

// All project routes require authentication
router.use(authenticate);

/**
 * POST /api/projects
 * Create a new project
 */
router.post(
  '/',
  [
    body('name').notEmpty().withMessage('Project name is required'),
    body('description').optional(),
  ],
  ProjectController.createProject
);

/**
 * GET /api/projects
 * Get all projects for current user
 */
router.get('/', ProjectController.getUserProjects);

/**
 * GET /api/projects/:id
 * Get project by ID
 */
router.get('/:id', ProjectController.getProject);

/**
 * PUT /api/projects/:id
 * Update project
 */
router.put(
  '/:id',
  [
    body('name').optional().notEmpty().withMessage('Name cannot be empty'),
    body('description').optional(),
  ],
  ProjectController.updateProject
);

/**
 * DELETE /api/projects/:id
 * Delete project
 */
router.delete('/:id', ProjectController.deleteProject);

export default router;
