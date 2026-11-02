import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { users, makeId } from '../data/store.js';

function makeToken(id) {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '7d'
  });
}

function publicUser(user) {
  return {
    id: user._id,
    name: user.name,
    email: user.email
  };
}

export async function register(req, res, next) {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    if (name.trim().length < 2) {
      return res.status(400).json({ message: 'Name must contain at least 2 characters.' });
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return res.status(400).json({ message: 'Enter a valid email address.' });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters.' });
    }

    const cleanEmail = email.toLowerCase().trim();

    const existingUser = users.find(user => user.email === cleanEmail);

    if (existingUser) {
      return res.status(409).json({ message: 'Email already registered.' });
    }

    const user = {
      _id: makeId(),
      name: name.trim(),
      email: cleanEmail,
      password: await bcrypt.hash(password, 10)
    };

    users.push(user);

    res.status(201).json({
      token: makeToken(user._id),
      user: publicUser(user)
    });

  } catch (error) {
    next(error);
  }
}

export async function login(req, res, next) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }

    const cleanEmail = email.toLowerCase().trim();

    const user = users.find(user => user.email === cleanEmail);

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Email or password is incorrect.' });
    }

    res.json({
      token: makeToken(user._id),
      user: publicUser(user)
    });

  } catch (error) {
    next(error);
  }
}

export function currentUser(req, res) {
  res.json({
    user: publicUser(req.user)
  });
}