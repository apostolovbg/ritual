import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { dbPromise } from '../app.js';

// Router handling user registration, login and profile management

const router = Router();
// JWT secret used to sign authentication tokens. In production this should
// come from an environment variable.
const SECRET = process.env.JWT_SECRET || 'secret';

// Helper function to create a short-lived JWT
function signToken(id) {
  return jwt.sign({ sub: id }, SECRET, { expiresIn: '1h' });
}

// Create a new user account and associated empty profile
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

// Authenticate a user and return a JWT
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

// Middleware to verify the JWT and attach the user record
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

// Return information about the currently authenticated user
router.get('/me', auth, (req, res) => {
  res.json({ id: req.user.id, email: req.user.email, role: req.user.role });
});

// Fetch the full profile for the logged in user
router.get('/me/profile', auth, async (req, res) => {
  const db = await dbPromise;
  if (req.user.role === 'artist') {
    const profile = await db.get('SELECT * FROM artist_profiles WHERE user_id = ?', req.user.id);
    return res.json(profile || {});
  }
  if (req.user.role === 'club') {
    const profile = await db.get('SELECT * FROM club_profiles WHERE user_id = ?', req.user.id);
    return res.json(profile || {});
  }
  res.json({});
});

// Update the profile for the logged-in user. Artists and clubs store different fields
router.put('/me/profile', auth, async (req, res) => {
  const db = await dbPromise;
  const updates = req.body;
  if (req.user.role === 'artist') {
    await db.run(
      `UPDATE artist_profiles SET 
        given_name = COALESCE(?, given_name),
        father_name = COALESCE(?, father_name),
        family_name = COALESCE(?, family_name),
        stage_name = COALESCE(?, stage_name),
        uses_real_name = COALESCE(?, uses_real_name),
        country = COALESCE(?, country),
        city = COALESCE(?, city),
        birth_date = COALESCE(?, birth_date),
        bio = COALESCE(?, bio),
        genres = COALESCE(?, genres),
        photo_path = COALESCE(?, photo_path),
        social_links = COALESCE(?, social_links)
      WHERE user_id = ?`,
      updates.given_name,
      updates.father_name,
      updates.family_name,
      updates.stage_name,
      updates.uses_real_name,
      updates.country,
      updates.city,
      updates.birth_date,
      updates.bio,
      updates.genres,
      updates.photo_path,
      updates.social_links,
      req.user.id
    );
  }
  if (req.user.role === 'club') {
    await db.run(
      `UPDATE club_profiles SET 
        name = COALESCE(?, name),
        country = COALESCE(?, country),
        city = COALESCE(?, city),
        address = COALESCE(?, address),
        capacity = COALESCE(?, capacity),
        genres = COALESCE(?, genres),
        hours = COALESCE(?, hours),
        about = COALESCE(?, about)
      WHERE user_id = ?`,
      updates.name,
      updates.country,
      updates.city,
      updates.address,
      updates.capacity,
      updates.genres,
      updates.hours,
      updates.about,
      req.user.id
    );
  }
  res.json({ success: true });
});

// Public lists of artists and clubs
router.get('/artists', async (_req, res) => {
  const db = await dbPromise;
  const artists = await db.all('SELECT user_id, stage_name, country, city FROM artist_profiles');
  res.json(artists);
});

router.get('/clubs', async (_req, res) => {
  const db = await dbPromise;
  const clubs = await db.all('SELECT user_id, name, country, city FROM club_profiles');
  res.json(clubs);
});

export default router;
