import { Router } from 'express';
import { dbPromise } from '../app.js';
import auth from '../middleware/auth.js'; // Reusable JWT auth middleware

// Router managing event creation and booking workflows

const router = Router();
// Routes below rely on the shared auth middleware which verifies tokens using
// the centrally configured JWT secret.

// Club users create events that artists can request to join
router.post('/events', auth, async (req, res) => {
  if (req.user.role !== 'club') return res.status(403).json({ error: 'Only clubs can create events' });
  const db = await dbPromise;
  const { title, date, start_time, end_time, location, genres } = req.body;
  const result = await db.run(
    `INSERT INTO events (club_id, title, date, start_time, end_time, location, genres)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    req.user.id,
    title,
    date,
    start_time,
    end_time,
    location,
    genres
  );
  const event = await db.get('SELECT * FROM events WHERE id = ?', result.lastID);
  res.json(event);
});

// Allow club users to update their events
router.put('/events/:id', auth, async (req, res) => {
  if (req.user.role !== 'club') return res.status(403).json({ error: 'Only clubs can edit events' });
  const db = await dbPromise;
  const existing = await db.get('SELECT * FROM events WHERE id = ?', req.params.id);
  if (!existing || existing.club_id !== req.user.id) return res.sendStatus(404);
  const { title, date, start_time, end_time, location, genres } = req.body;
  await db.run(
    `UPDATE events SET 
      title = COALESCE(?, title),
      date = COALESCE(?, date),
      start_time = COALESCE(?, start_time),
      end_time = COALESCE(?, end_time),
      location = COALESCE(?, location),
      genres = COALESCE(?, genres)
     WHERE id = ?`,
    title,
    date,
    start_time,
    end_time,
    location,
    genres,
    req.params.id
  );
  const updated = await db.get('SELECT * FROM events WHERE id = ?', req.params.id);
  res.json(updated);
});

// List all upcoming events
router.get('/events', async (req, res) => {
  const db = await dbPromise;
  const events = await db.all('SELECT * FROM events');
  res.json(events);
});

// Retrieve a single event by ID
router.get('/events/:id', async (req, res) => {
  const db = await dbPromise;
  const event = await db.get('SELECT * FROM events WHERE id = ?', req.params.id);
  if (!event) return res.sendStatus(404);
  res.json(event);
});

// Return all events created by a specific club. Used when displaying a venue
// profile so visitors can see upcoming gigs for that location.
router.get('/clubs/:id/events', async (req, res) => {
  const db = await dbPromise;
  const events = await db.all('SELECT * FROM events WHERE club_id = ?', req.params.id);
  res.json(events);
});

// Artists request to perform at an event
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

// View bookings for the authenticated user, filtering by role
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

// Export router to be mounted in the main app
export default router;
