import pool from '../config/db.js';

export const findUserByEmail = async (email) => {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    return result.rows[0];
};

export const findUserById = async (id) => {
    const result = await pool.query('SELECT id, name, email, role, token_version FROM users WHERE id = $1', [id]);
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
};

// For logout: Increment token_version to invalidate tokens
export const incrementTokenVersion = async (userId) => {
    const result = await pool.query(
        'UPDATE users SET token_version = token_version + 1 WHERE id = $1 RETURNING token_version',
        [userId]
    );
    if (result.rows.length === 0) {
        throw new Error('User not found for token invalidation');
    }
    return result.rows[0];
};

