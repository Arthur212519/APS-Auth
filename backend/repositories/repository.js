import { pool } from "../db/index.js";

export const findUserByUsername = async (username) => {
    return pool.query('SELECT id, username, password_hash, role FROM users WHERE username = $1',
        [username]
    );
};

export const createUser = async ({ username, passwordHash, email, role }) => {
    return pool.query(
        'INSERT INTO users (username, password_hash, email, role) VALUES ($1, $2, $3, $4)',
        [username, passwordHash, email, role]
    );
};

export const userExists = async (username, email) => {
  return pool.query(
    'SELECT 1 FROM users WHERE username = $1 OR email = $2',
    [username, email]
  );
};

export const userDelete = async (username) => {
    return pool.query('DELETE FROM users WHERE id = $1',
        [username]
    );
}