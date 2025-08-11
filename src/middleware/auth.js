import jwt from 'jsonwebtoken';
import { jwtSecret } from '../config.js';
import { dbPromise } from '../app.js';

// Express middleware validating incoming JWT tokens. The middleware extracts the
// bearer token from the Authorization header, verifies it using the configured
// secret and loads the associated user record from the database. Successful
// requests gain access to the user via `req.user`; otherwise a 401 status is
// returned.
export default async function auth(req, res, next) {
  const header = req.headers.authorization;
  if (!header) return res.sendStatus(401);
  const token = header.split(' ')[1];
  try {
    const decoded = jwt.verify(token, jwtSecret);
    const db = await dbPromise;
    const user = await db.get('SELECT * FROM users WHERE id = ?', decoded.sub);
    if (!user) throw new Error('User not found');
    req.user = user;
    next();
  } catch {
    res.sendStatus(401);
  }
}
