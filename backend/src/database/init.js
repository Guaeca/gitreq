/**
 * Database Initialization
 * Sets up the database schema
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import pool from '../config/database.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Initialize database schema
 */
export async function initDatabase() {
  try {
    console.log('Initializing database...');

    // Read schema file
    const schemaPath = path.join(__dirname, 'schema.sql');
    const schema = fs.readFileSync(schemaPath, 'utf8');

    // Execute schema
    await pool.query(schema);

    console.log('✓ Database initialized successfully');
  } catch (error) {
    console.error('✗ Database initialization failed:', error);
    throw error;
  }
}

export default initDatabase;
