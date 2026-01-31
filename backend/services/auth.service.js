import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {
  findUserByUsername,
  createUser,
  userExists
} from '../repositories/repository.js';

export const loginService = async ({ username, password }) => {
  const result = await findUserByUsername(username);
  const user = result.rows[0];

  if (!user) return null;

  const passwordMatch = await bcrypt.compare(password, user.password_hash);
  if (!passwordMatch) return null;

  const token = jwt.sign(
    { sub: user.id, role: user.role },
    process.env.SECRET_KEY,
    { expiresIn: '15m' }
  );

  return token;
};

export const registerService = async ({ username, password, email }) => {
  const exists = await userExists(username, email);

  if (exists.rowCount > 0) {
    throw new Error('USER_EXISTS');
  }

  const passwordHash = await bcrypt.hash(password, 12);

  await createUser({
    username,
    passwordHash,
    email,
    role: 'user'
  });
};
