import 'dotenv/config'; // Load variables from .env if present
import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { initDb } from './db.js';
import users from './routes/users.js';
import events from './routes/events.js';

// Primary Express application setup. Routers are mounted for feature modules
// and exported for use by both tests and the HTTP server.

const app = express();
// Accept JSON bodies from API clients
app.use(express.json());
// Serve static frontend files from the public directory
app.use(express.static('public'));

export const dbPromise = initDb();
// Mount feature-specific routers
app.use(users);
app.use(events);

// Export the configured Express app for use by the server and tests
export default app;
