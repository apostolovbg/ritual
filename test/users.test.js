import request from 'supertest';
import app, { dbPromise } from '../src/app.js';

beforeAll(async () => {
  const db = await dbPromise;
  await db.exec('DELETE FROM users');
  await db.exec('DELETE FROM artist_profiles');
  await db.exec('DELETE FROM club_profiles');
});

let token;
let userId;

it('rejects invalid registration data', async () => {
  const res = await request(app).post('/register').send({ email: 'bad', role: 'artist' });
  expect(res.statusCode).toBe(400);
});

it('registers and logs in user', async () => {
  const res = await request(app).post('/register').send({ email: 'user@example.com', password: 'password', role: 'artist' });
  expect(res.statusCode).toBe(200);
  userId = res.body.id;
  const login = await request(app).post('/login').send({ email: 'user@example.com', password: 'password' });
  expect(login.statusCode).toBe(200);
  token = login.body.access_token;
  const me = await request(app).get('/me').set('Authorization', `Bearer ${token}`);
  expect(me.statusCode).toBe(200);
  expect(me.body.email).toBe('user@example.com');
});

// Ensure the API rejects attempts to register an email that already exists
it('rejects duplicate registration', async () => {
  const res = await request(app)
    .post('/register')
    .send({ email: 'user@example.com', password: 'password', role: 'artist' });
  expect(res.statusCode).toBe(400);
  expect(res.body.error).toBe('Email already registered');
});

// Login with an incorrect password should not succeed and must return a 400
it('fails login with wrong password', async () => {
  const res = await request(app)
    .post('/login')
    .send({ email: 'user@example.com', password: 'wrong' });
  expect(res.statusCode).toBe(400);
  expect(res.body.error).toBe('Incorrect email or password');
});

// Protected routes like /me require a valid JWT token in the Authorization header
it('rejects unauthenticated access to /me', async () => {
  const res = await request(app).get('/me');
  expect(res.statusCode).toBe(401);
});

it('updates and retrieves profile', async () => {
  await request(app)
    .put('/me/profile')
    .set('Authorization', `Bearer ${token}`)
    .send({ email: 'new@example.com', given_name: 'A', family_name: 'B', bio: 'Bio' });
  const profile = await request(app)
    .get('/me/profile')
    .set('Authorization', `Bearer ${token}`);
  expect(profile.statusCode).toBe(200);
  expect(profile.body.given_name).toBe('A');
  const me = await request(app)
    .get('/me')
    .set('Authorization', `Bearer ${token}`);
  expect(me.body.email).toBe('new@example.com');
});

it('lists artists', async () => {
  const res = await request(app).get('/artists');
  expect(res.statusCode).toBe(200);
  expect(res.body.length).toBeGreaterThan(0);
});

it('fetches public profile', async () => {
  const res = await request(app).get(`/profiles/${userId}`);
  expect(res.statusCode).toBe(200);
  expect(res.body.given_name).toBe('A');
});
