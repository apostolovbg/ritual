import request from 'supertest';
import app, { dbPromise } from '../src/app.js';

let clubToken, artistToken, clubId, eventId;

beforeAll(async () => {
  const db = await dbPromise;
  await db.exec('DELETE FROM users');
  await db.exec('DELETE FROM artist_profiles');
  await db.exec('DELETE FROM club_profiles');
  await db.exec('DELETE FROM events');
  await db.exec('DELETE FROM bookings');
});

test('event and booking flow', async () => {
  const clubReg = await request(app).post('/register').send({ email: 'club@example.com', password: 'pass', role: 'club' });
  clubId = clubReg.body.id;
  const respClubLogin = await request(app).post('/login').send({ email: 'club@example.com', password: 'pass' });
  clubToken = respClubLogin.body.access_token;

  await request(app).post('/register').send({ email: 'artist@example.com', password: 'pass', role: 'artist' });
  const respArtistLogin = await request(app).post('/login').send({ email: 'artist@example.com', password: 'pass' });
  artistToken = respArtistLogin.body.access_token;

  const eventResp = await request(app)
    .post('/events')
    .set('Authorization', `Bearer ${clubToken}`)
    .send({ title: 'Gig', start_time: '20:00', end_time: '23:00' });
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
