/**
 * Main Server File
 * Entry point for the GitReq backend API
 */

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { config } from './config/index.js';
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js';

// Import routes
import authRoutes from './modules/auth/routes/authRoutes.js';
import projectRoutes from './modules/projects/routes/projectRoutes.js';
import fileRoutes from './modules/files/routes/fileRoutes.js';

// Load environment variables
dotenv.config();

// Create Express app
const app = express();

/**
 * Middleware
 */
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

/**
 * Health check endpoint
 */
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    environment: config.nodeEnv,
  });
});

/**
 * API Routes
 */
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/files', fileRoutes);

/**
 * Root endpoint
 */
app.get('/', (req, res) => {
  res.json({
    message: 'GitReq API',
    version: '1.0.0',
    documentation: '/api/docs',
  });
});

/**
 * Error handling
 */
app.use(notFoundHandler); // Handle 404 errors
app.use(errorHandler); // Handle all other errors

/**
 * Start server
 */
const PORT = config.port;

app.listen(PORT, () => {
  console.log('╔════════════════════════════════════════╗');
  console.log('║         GitReq API Server              ║');
  console.log('╚════════════════════════════════════════╝');
  console.log(`✓ Server running on port ${PORT}`);
  console.log(`✓ Environment: ${config.nodeEnv}`);
  console.log(`✓ API: http://localhost:${PORT}`);
  console.log('════════════════════════════════════════');
});

export default app;
