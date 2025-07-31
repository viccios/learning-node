import jwt from 'jsonwebtoken';
import { SECRET_KEY } from '#config/config.js';

export default function authenticateToken(req, res, next) {
  const authorizationHeader = req.headers.authorization;
  const token = authorizationHeader?.replace('Bearer ', '');

  if (!token) {
    return res.status(403).json({ message: 'Token not provided!' });
  }

  try {
    const decodedUser = jwt.verify(token, SECRET_KEY);
    req.user = decodedUser;

    next();
  } catch (error) {
    console.log(error);
    return res.status(403).json({ message: 'Invalid token!' });
  }
}
