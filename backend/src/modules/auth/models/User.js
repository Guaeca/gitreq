/**
 * User Model
 * Database operations for users
 */

import pool from '../../../config/database.js';

export class User {
  /**
   * Create a new user
   */
  static async create({ email, passwordHash, name }) {
    const query = `
      INSERT INTO users (email, password_hash, name, created_at, updated_at)
      VALUES ($1, $2, $3, NOW(), NOW())
      RETURNING id, email, name, created_at
    `;
    const values = [email, passwordHash, name];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  /**
   * Find user by email
   */
  static async findByEmail(email) {
    const query = 'SELECT * FROM users WHERE email = $1';
    const result = await pool.query(query, [email]);
    return result.rows[0];
  }

  /**
   * Find user by ID
   */
  static async findById(id) {
    const query = 'SELECT id, email, name, created_at FROM users WHERE id = $1';
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }

  /**
   * Update user
   */
  static async update(id, updates) {
    const allowedFields = ['name', 'email'];
    const fields = [];
    const values = [];
    let paramCount = 1;

    Object.keys(updates).forEach((key) => {
      if (allowedFields.includes(key)) {
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
      UPDATE users
      SET ${fields.join(', ')}, updated_at = NOW()
      WHERE id = $${paramCount}
      RETURNING id, email, name, updated_at
    `;

    const result = await pool.query(query, values);
    return result.rows[0];
  }

  /**
   * Delete user
   */
  static async delete(id) {
    const query = 'DELETE FROM users WHERE id = $1 RETURNING id';
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }
}

export default User;
