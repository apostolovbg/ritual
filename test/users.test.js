import request from 'supertest';
import app, { dbPromise } from '../src/app.js';

beforeAll(async () => {
  const db = await dbPromise;
  await db.exec('DELETE FROM users');
  await db.exec('DELETE FROM artist_profiles');
  await db.exec('DELETE FROM club_profiles');
});

let token;

it('registers and logs in user', async () => {
  const res = await request(app).post('/register').send({ email: 'user@example.com', password: 'pass', role: 'artist' });
  expect(res.statusCode).toBe(200);
  const login = await request(app).post('/login').send({ email: 'user@example.com', password: 'pass' });
  expect(login.statusCode).toBe(200);
  token = login.body.access_token;
  const me = await request(app).get('/me').set('Authorization', `Bearer ${token}`);
  expect(me.statusCode).toBe(200);
  expect(me.body.email).toBe('user@example.com');
});
