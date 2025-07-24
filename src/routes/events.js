import { Router } from 'express';
import { dbPromise } from '../app.js';
import jwt from 'jsonwebtoken';

const router = Router();
const SECRET = process.env.JWT_SECRET || 'secret';

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

router.post('/events', auth, async (req, res) => {
  if (req.user.role !== 'club') return res.status(403).json({ error: 'Only clubs can create events' });
  const db = await dbPromise;
  const { title, date, location, genres } = req.body;
  const result = await db.run(
    'INSERT INTO events (club_id, title, date, location, genres) VALUES (?, ?, ?, ?, ?)',
    req.user.id,
    title,
    date,
    location,
    genres
  );
  const event = await db.get('SELECT * FROM events WHERE id = ?', result.lastID);
  res.json(event);
});

router.get('/events', async (req, res) => {
  const db = await dbPromise;
  const events = await db.all('SELECT * FROM events');
  res.json(events);
});

router.get('/events/:id', async (req, res) => {
  const db = await dbPromise;
  const event = await db.get('SELECT * FROM events WHERE id = ?', req.params.id);
  if (!event) return res.sendStatus(404);
  res.json(event);
});

router.post('/bookings', auth, async (req, res) => {
  if (req.user.role !== 'artist') return res.status(403).json({ error: 'Only artists can request bookings' });
  const db = await dbPromise;
  const { club_id, event_id } = req.body;
  const result = await db.run(
    'INSERT INTO bookings (artist_id, club_id, event_id) VALUES (?, ?, ?)',
    req.user.id,
    club_id,
    event_id
  );
  const booking = await db.get('SELECT * FROM bookings WHERE id = ?', result.lastID);
  res.json(booking);
});

router.get('/my-bookings', auth, async (req, res) => {
  const db = await dbPromise;
  let bookings;
  if (req.user.role === 'artist') {
    bookings = await db.all('SELECT * FROM bookings WHERE artist_id = ?', req.user.id);
  } else {
    bookings = await db.all('SELECT * FROM bookings WHERE club_id = ?', req.user.id);
  }
  res.json(bookings);
});

export default router;
