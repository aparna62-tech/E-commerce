import jwt from 'jsonwebtoken';
import { users } from '../data/store.js';

export async function protect(req, res, next) {
  try {
    const header = req.headers.authorization;

    if (!header || !header.startsWith('Bearer ')) {
      return res.status(401).json({
        message: 'Please log in to continue.'
      });
    }

    const token = header.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = users.find(user => user._id === decoded.id);

    if (!user) {
      return res.status(401).json({
        message: 'User account was not found. Please register again.'
      });
    }

    req.user = user;
    next();

  } catch (error) {
    return res.status(401).json({
      message: 'Your session is invalid. Please log in again.'
    });
  }
}