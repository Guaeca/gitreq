/**
 * Main Configuration File
 * Exports all configuration settings
 */

import dotenv from 'dotenv';

dotenv.config();

export const config = {
  // Server settings
  port: process.env.PORT || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',

  // JWT settings
  jwt: {
    secret: process.env.JWT_SECRET || 'change-this-secret-key',
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  },

  // Database settings
  database: {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    name: process.env.DB_NAME || 'gitreq',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD,
  },

  // GCP settings
  gcp: {
    projectId: process.env.GCP_PROJECT_ID,
    region: process.env.GCP_REGION || 'us-central1',
  },
};

export default config;
