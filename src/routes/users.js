import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { dbPromise } from '../app.js';

const router = Router();
const SECRET = process.env.JWT_SECRET || 'secret';

function signToken(id) {
  return jwt.sign({ sub: id }, SECRET, { expiresIn: '1h' });
}

router.post('/register', async (req, res) => {
  const db = await dbPromise;
  const { email, password, role } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  try {
    const result = await db.run(
      'INSERT INTO users (email, hashed_password, role) VALUES (?, ?, ?)',
      email,
      hashed,
      role
    );
    const id = result.lastID;
    if (role === 'artist') {
      await db.run('INSERT INTO artist_profiles (user_id) VALUES (?)', id);
    } else if (role === 'club') {
      await db.run('INSERT INTO club_profiles (user_id) VALUES (?)', id);
    }
    res.json({ id, email, role });
  } catch (e) {
    res.status(400).json({ error: 'Email already registered' });
  }
});

router.post('/login', async (req, res) => {
  const db = await dbPromise;
  const { email, password } = req.body;
  const user = await db.get('SELECT * FROM users WHERE email = ?', email);
  if (!user || !(await bcrypt.compare(password, user.hashed_password))) {
    return res.status(400).json({ error: 'Incorrect email or password' });
  }
  const token = signToken(user.id);
  res.json({ access_token: token });
});

async function auth(req, res, next) {
  const header = req.headers.authorization;
  if (!header) return res.sendStatus(401);
  const token = header.split(' ')[1];
  try {
    const decoded = jwt.verify(token, SECRET);
    const db = await dbPromise;
    const user = await db.get('SELECT * FROM users WHERE id = ?', decoded.sub);
    if (!user) throw new Error('not found');
    req.user = user;
    next();
  } catch {
    res.sendStatus(401);
  }
}

router.get('/me', auth, (req, res) => {
  res.json({ id: req.user.id, email: req.user.email, role: req.user.role });
});

router.put('/me/profile', auth, async (req, res) => {
  const db = await dbPromise;
  const updates = req.body;
  if (req.user.role === 'artist') {
    await db.run(
      `UPDATE artist_profiles SET bio = COALESCE(?, bio), genres = COALESCE(?, genres), social_links = COALESCE(?, social_links) WHERE user_id = ?`,
      updates.bio,
      updates.genres,
      updates.social_links,
      req.user.id
    );
  }
  if (req.user.role === 'club') {
    await db.run(
      `UPDATE club_profiles SET location = COALESCE(?, location), capacity = COALESCE(?, capacity), about = COALESCE(?, about) WHERE user_id = ?`,
      updates.location,
      updates.capacity,
      updates.about,
      req.user.id
    );
  }
  res.json({ success: true });
});

export default router;
