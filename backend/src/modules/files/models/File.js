/**
 * File Model
 * Database operations for files/requirements
 */

import pool from '../../../config/database.js';

export class File {
  /**
   * Create a new file
   */
  static async create({ name, content, type, projectId }) {
    const query = `
      INSERT INTO files (name, content, type, project_id, created_at, updated_at)
      VALUES ($1, $2, $3, $4, NOW(), NOW())
      RETURNING id, name, content, type, project_id, created_at, updated_at
    `;
    const values = [name, content, type, projectId];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  /**
   * Find all files for a project
   */
  static async findByProjectId(projectId, options = {}) {
    const { limit = 100, offset = 0, type } = options;

    let query = `
      SELECT id, name, type, project_id, created_at, updated_at
      FROM files
      WHERE project_id = $1
    `;
    const values = [projectId];

    if (type) {
      query += ` AND type = $${values.length + 1}`;
      values.push(type);
    }

    query += ` ORDER BY updated_at DESC LIMIT $${values.length + 1} OFFSET $${values.length + 2}`;
    values.push(limit, offset);

    const result = await pool.query(query, values);
    return result.rows;
  }

  /**
   * Find file by ID (with content)
   */
  static async findById(id) {
    const query = `
      SELECT f.*, p.owner_id
      FROM files f
      LEFT JOIN projects p ON f.project_id = p.id
      WHERE f.id = $1
    `;
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }

  /**
   * Update file
   */
  static async update(id, updates) {
    const allowedFields = ['name', 'content', 'type'];
    const fields = [];
    const values = [];
    let paramCount = 1;

    Object.keys(updates).forEach((key) => {
      if (allowedFields.includes(key) && updates[key] !== undefined) {
        fields.push(`${key} = $${paramCount}`);
        values.push(updates[key]);
        paramCount++;
      }
    });

    if (fields.length === 0) {
      throw new Error('No valid fields to update');
    }

    values.push(id);
    const query = `
      UPDATE files
      SET ${fields.join(', ')}, updated_at = NOW()
      WHERE id = $${paramCount}
      RETURNING id, name, content, type, project_id, updated_at
    `;

    const result = await pool.query(query, values);
    return result.rows[0];
  }

  /**
   * Delete file
   */
  static async delete(id) {
    const query = 'DELETE FROM files WHERE id = $1 RETURNING id';
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }

  /**
   * Check if user has access to file (via project ownership)
   */
  static async hasAccess(fileId, userId) {
    const query = `
      SELECT f.id
      FROM files f
      INNER JOIN projects p ON f.project_id = p.id
      WHERE f.id = $1 AND p.owner_id = $2
    `;
    const result = await pool.query(query, [fileId, userId]);
    return result.rows.length > 0;
  }
}

export default File;
