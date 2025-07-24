import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { initDb } from './db.js';
import users from './routes/users.js';
import events from './routes/events.js';

const app = express();
app.use(express.json());

export const dbPromise = initDb();
app.use(users);
app.use(events);

export default app;
