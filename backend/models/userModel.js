import pool from '../config/db.js';

export const findUserByEmail = async (email) => {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    return result.rows[0];
};

export const createNewUser = async (name, email, passwordHash, role) => {
    const query = `
    INSERT INTO users (name, email, password_hash, role)
    VALUES ($1, $2, $3, $4) 
    RETURNING id, name, email, role, created_at
    `;
 const values = [name, email, passwordHash, role];
 const { rows } = await pool.query(query, values);
 return rows[0];
}