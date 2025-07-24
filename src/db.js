import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

// Initialize and configure the SQLite database. All tables are created on startup
// so the app can run without manual migrations.

export async function initDb() {
  // Open a connection to the SQLite file. The driver provides a Promise-based API
  const db = await open({ filename: 'database.sqlite', driver: sqlite3.Database });
  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      hashed_password TEXT NOT NULL,
      role TEXT NOT NULL,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    );
    CREATE TABLE IF NOT EXISTS artist_profiles (
      user_id INTEGER PRIMARY KEY,
      bio TEXT DEFAULT '',
      genres TEXT DEFAULT '',
      social_links TEXT DEFAULT '',
      FOREIGN KEY(user_id) REFERENCES users(id)
    );
    CREATE TABLE IF NOT EXISTS club_profiles (
      user_id INTEGER PRIMARY KEY,
      location TEXT DEFAULT '',
      capacity INTEGER DEFAULT 0,
      about TEXT DEFAULT '',
      FOREIGN KEY(user_id) REFERENCES users(id)
    );
    CREATE TABLE IF NOT EXISTS events (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      club_id INTEGER NOT NULL,
      title TEXT NOT NULL,
      date TEXT DEFAULT CURRENT_TIMESTAMP,
      location TEXT DEFAULT '',
      genres TEXT DEFAULT '',
      FOREIGN KEY(club_id) REFERENCES users(id)
    );
    CREATE TABLE IF NOT EXISTS bookings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      artist_id INTEGER NOT NULL,
      club_id INTEGER NOT NULL,
      event_id INTEGER,
      status TEXT DEFAULT 'pending',
      FOREIGN KEY(artist_id) REFERENCES users(id),
      FOREIGN KEY(club_id) REFERENCES users(id),
      FOREIGN KEY(event_id) REFERENCES events(id)
    );
  `);
  // Return the database instance so routers can perform queries
  return db;
}
