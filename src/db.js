import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

// Initialize and configure the SQLite database. All tables are created on startup
// so the app can run without manual migrations.

export async function initDb() {
  // Open a connection to the SQLite file. The driver provides a Promise-based API
  const db = await open({ filename: 'database.sqlite', driver: sqlite3.Database });
  // Enforce foreign key constraints so orphaned references are rejected
  await db.run('PRAGMA foreign_keys = ON');
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
      given_name TEXT DEFAULT '',
      father_name TEXT DEFAULT '',
      family_name TEXT DEFAULT '',
      stage_name TEXT DEFAULT '',
      uses_real_name INTEGER DEFAULT 0,
      country TEXT DEFAULT '',
      city TEXT DEFAULT '',
      birth_date TEXT DEFAULT '',
      bio TEXT DEFAULT '',
      genres TEXT DEFAULT '',
      photo_path TEXT DEFAULT '',
      social_links TEXT DEFAULT '',
      FOREIGN KEY(user_id) REFERENCES users(id)
    );
    CREATE TABLE IF NOT EXISTS club_profiles (
      user_id INTEGER PRIMARY KEY,
      name TEXT DEFAULT '',
      country TEXT DEFAULT '',
      city TEXT DEFAULT '',
      address TEXT DEFAULT '',
      capacity INTEGER DEFAULT 0,
      genres TEXT DEFAULT '',
      hours TEXT DEFAULT '',
      about TEXT DEFAULT '',
      FOREIGN KEY(user_id) REFERENCES users(id)
    );
    CREATE TABLE IF NOT EXISTS events (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      club_id INTEGER NOT NULL,
      title TEXT NOT NULL,
      date TEXT DEFAULT CURRENT_TIMESTAMP,
      start_time TEXT DEFAULT '',
      end_time TEXT DEFAULT '',
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
