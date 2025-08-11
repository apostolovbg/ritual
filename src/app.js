import 'dotenv/config'; // Load variables from .env if present
import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { initDb } from './db.js';
import users from './routes/users.js';
import events from './routes/events.js';
import payments from './routes/payments.js';
import analytics from './routes/analytics.js';
import notifications from './routes/notifications.js';
import recommendations from './routes/recommendations.js';
import rewards from './routes/rewards.js';

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
app.use(payments); // Phase 5: payment provider integration placeholder
app.use(analytics); // Phase 5: basic metrics endpoint
app.use(notifications); // Phase 5: notification stubs
app.use(recommendations); // Phase 6: AI-driven recommendations prototype
app.use(rewards); // Phase 6: blockchain rewards prototype

// Export the configured Express app for use by the server and tests
export default app;
