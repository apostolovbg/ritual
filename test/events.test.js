import request from 'supertest';
import app, { dbPromise } from '../src/app.js';

let clubToken, artistToken, clubId, eventId;

beforeAll(async () => {
  const db = await dbPromise;
  // Cascading deletes mean removing users clears related profiles, events and bookings
  await db.exec('DELETE FROM users');
});

test('event and booking flow', async () => {
  const clubReg = await request(app).post('/register').send({ email: 'club@example.com', password: 'password', role: 'club' });
  clubId = clubReg.body.id;
  const respClubLogin = await request(app).post('/login').send({ email: 'club@example.com', password: 'password' });
  clubToken = respClubLogin.body.access_token;

  await request(app).post('/register').send({ email: 'artist@example.com', password: 'password', role: 'artist' });
  const respArtistLogin = await request(app).post('/login').send({ email: 'artist@example.com', password: 'password' });
  artistToken = respArtistLogin.body.access_token;

  // Attempt to create an invalid event missing required fields
  const invalidEvent = await request(app)
    .post('/events')
    .set('Authorization', `Bearer ${clubToken}`)
    .send({ title: 'Gig' });
  expect(invalidEvent.statusCode).toBe(400);

  const eventResp = await request(app)
    .post('/events')
    .set('Authorization', `Bearer ${clubToken}`)
    .send({
      title: 'Gig',
      date: '2025-12-25',
      start_time: '20:00',
      end_time: '23:00',
      location: 'Town',
      genres: 'rock'
    });
  expect(eventResp.statusCode).toBe(200);
  eventId = eventResp.body.id;

  const bookingResp = await request(app)
    .post('/bookings')
    .set('Authorization', `Bearer ${artistToken}`)
    .send({ club_id: clubId, event_id: eventId });
  expect(bookingResp.statusCode).toBe(200);

  const myBookings = await request(app)
    .get('/my-bookings')
    .set('Authorization', `Bearer ${artistToken}`);
  expect(myBookings.statusCode).toBe(200);
  expect(myBookings.body.length).toBe(1);

  // Invalid update with bad time format
  const badUpdate = await request(app)
    .put(`/events/${eventId}`)
    .set('Authorization', `Bearer ${clubToken}`)
    .send({ start_time: 'invalid' });
  expect(badUpdate.statusCode).toBe(400);

  const edit = await request(app)
    .put(`/events/${eventId}`)
    .set('Authorization', `Bearer ${clubToken}`)
    .send({ title: 'Updated' });
  expect(edit.statusCode).toBe(200);
  expect(edit.body.title).toBe('Updated');

  const byClub = await request(app).get(`/clubs/${clubId}/events`);
  expect(byClub.statusCode).toBe(200);
  expect(byClub.body.length).toBe(1);
});

// Verify that only clubs can create events
test('rejects event creation without club credentials', async () => {
  const res = await request(app)
    .post('/events')
    .set('Authorization', `Bearer ${artistToken}`)
    .send({
      title: 'Another',
      date: '2025-12-31',
      start_time: '21:00',
      end_time: '23:00',
      location: 'City',
      genres: 'jazz'
    });
  expect(res.statusCode).toBe(403);
  expect(res.body.error).toBe('Only clubs can create events');
});

// Event editing should also be restricted to club accounts
test('rejects event editing without club credentials', async () => {
  const res = await request(app)
    .put(`/events/${eventId}`)
    .set('Authorization', `Bearer ${artistToken}`)
    .send({ title: 'Hacked' });
  expect(res.statusCode).toBe(403);
  expect(res.body.error).toBe('Only clubs can edit events');
});

// Booking requests must originate from artist accounts, not clubs
test('rejects booking without artist credentials', async () => {
  const res = await request(app)
    .post('/bookings')
    .set('Authorization', `Bearer ${clubToken}`)
    .send({ club_id: clubId, event_id: eventId });
  expect(res.statusCode).toBe(403);
  expect(res.body.error).toBe('Only artists can request bookings');
});
