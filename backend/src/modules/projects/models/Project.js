/**
 * Project Model
 * Database operations for projects
 */

import pool from '../../../config/database.js';

export class Project {
  /**
   * Create a new project
   */
  static async create({ name, description, userId }) {
    const query = `
      INSERT INTO projects (name, description, owner_id, created_at, updated_at)
      VALUES ($1, $2, $3, NOW(), NOW())
      RETURNING id, name, description, owner_id, created_at, updated_at
    `;
    const values = [name, description, userId];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  /**
   * Find all projects for a user
   */
  static async findByUserId(userId, options = {}) {
    const { limit = 50, offset = 0 } = options;

    const query = `
      SELECT p.*, u.name as owner_name, u.email as owner_email
      FROM projects p
      LEFT JOIN users u ON p.owner_id = u.id
      WHERE p.owner_id = $1
      ORDER BY p.updated_at DESC
      LIMIT $2 OFFSET $3
    `;
    const result = await pool.query(query, [userId, limit, offset]);
    return result.rows;
  }

  /**
   * Find project by ID
   */
  static async findById(id) {
    const query = `
      SELECT p.*, u.name as owner_name, u.email as owner_email
      FROM projects p
      LEFT JOIN users u ON p.owner_id = u.id
      WHERE p.id = $1
    `;
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }

  /**
   * Update project
   */
  static async update(id, updates) {
    const allowedFields = ['name', 'description'];
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
      UPDATE projects
      SET ${fields.join(', ')}, updated_at = NOW()
      WHERE id = $${paramCount}
      RETURNING id, name, description, owner_id, updated_at
    `;

    const result = await pool.query(query, values);
    return result.rows[0];
  }

  /**
   * Delete project
   */
  static async delete(id) {
    const query = 'DELETE FROM projects WHERE id = $1 RETURNING id';
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }

  /**
   * Check if user owns project
   */
  static async isOwner(projectId, userId) {
    const query = 'SELECT owner_id FROM projects WHERE id = $1';
    const result = await pool.query(query, [projectId]);
    return result.rows[0]?.owner_id === userId;
  }
}

export default Project;
