import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { users } from '#models/userModel.js';
import { SECRET_KEY } from '#config/config.js';

const SALT_ROUNDS = 10;

export async function registerUser(req, res) {
  const { username, password, roles } = req.body;

  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

  const newUser = {
    id: users.length + 1,
    username,
    password: hashedPassword,
    roles: roles || ['user'],
  };

  users.push(newUser);

  res.status(201).json({ message: 'User registered successfully!' });
}

export async function loginUser(req, res) {
  const { username, password } = req.body;

  const user = users.find((user) => user.username === username);

  if (!user) {
    return res.status(404).json({ message: 'User not found ' });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(401).json({ message: 'Incorrect password!' });
  }

  const token = jwt.sign(
    { id: user.id, username: user.username, roles: user.roles },
    SECRET_KEY,
    { expiresIn: '1h' },
  );

  res.status(200).json({ token });
}
