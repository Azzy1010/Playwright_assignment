import { Pool } from 'pg';
import { dbConnectionString } from '../db/database_config/dbConfig'; // adjust this path if needed

// Create a reusable pool of connections
const pool = new Pool({ connectionString: dbConnectionString });

export const db = {
  async createUser(name: string, email: string) {
    const res = await pool.query(
      'INSERT INTO student (name, email) VALUES ($1, $2) RETURNING *',
      [name, email]
    );
    return res.rows[0];
  },

  async getUsers() {
    const res = await pool.query('SELECT * FROM student');
    return res.rows;
  },

  async updateUser(id: number, name: string) {
    const res = await pool.query(
      'UPDATE student SET name = $1 WHERE id = $2 RETURNING *',
      [name, id]
    );
    return res.rows[0];
  },

  async deleteUser(id: number) {
    const res = await pool.query(
      'DELETE FROM student WHERE id = $1 RETURNING *',
      [id]
    );
    return res.rows[0];
  },

  async close() {
    await pool.end();
  }
};