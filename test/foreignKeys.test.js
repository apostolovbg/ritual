import { dbPromise } from '../src/app.js';

// Low-level tests asserting database foreign key constraints and cascading deletes.
beforeAll(async () => {
  const db = await dbPromise;
  // Cascading deletes allow us to clear the entire schema with one statement
  await db.exec('DELETE FROM users');
});

test('rejects event with non-existent club', async () => {
  const db = await dbPromise;
  await expect(db.run("INSERT INTO events (club_id, title) VALUES (9999, 'Ghost Event')")).rejects.toThrow(
    /FOREIGN KEY constraint failed/
  );
});

test('rejects booking with missing references', async () => {
  const db = await dbPromise;
  await expect(
    db.run("INSERT INTO bookings (artist_id, club_id, event_id) VALUES (1, 2, 3)")
  ).rejects.toThrow(/FOREIGN KEY constraint failed/);
});

test('deleting parents cascades to related tables', async () => {
  const db = await dbPromise;
  // Create a club with a profile
  const club = await db.run(
    "INSERT INTO users (email, hashed_password, role) VALUES ('club@x.com', 'pass', 'club')"
  );
  await db.run("INSERT INTO club_profiles (user_id, name) VALUES (?, 'Club')", club.lastID);
  // Create two artists with profiles
  const artistA = await db.run(
    "INSERT INTO users (email, hashed_password, role) VALUES ('a@x.com', 'pass', 'artist')"
  );
  await db.run(
    "INSERT INTO artist_profiles (user_id, given_name) VALUES (?, 'A')",
    artistA.lastID
  );
  const artistB = await db.run(
    "INSERT INTO users (email, hashed_password, role) VALUES ('b@x.com', 'pass', 'artist')"
  );
  await db.run(
    "INSERT INTO artist_profiles (user_id, given_name) VALUES (?, 'B')",
    artistB.lastID
  );
  // Create an event and bookings for both artists
  const event = await db.run(
    "INSERT INTO events (club_id, title) VALUES (?, 'Gig')",
    club.lastID
  );
  await db.run(
    "INSERT INTO bookings (artist_id, club_id, event_id) VALUES (?, ?, ?)",
    artistA.lastID,
    club.lastID,
    event.lastID
  );
  await db.run(
    "INSERT INTO bookings (artist_id, club_id, event_id) VALUES (?, ?, ?)",
    artistB.lastID,
    club.lastID,
    event.lastID
  );

  // Remove one artist and verify their profile and booking disappeared
  await db.run("DELETE FROM users WHERE id = ?", artistA.lastID);
  const missingProfile = await db.get(
    "SELECT * FROM artist_profiles WHERE user_id = ?",
    artistA.lastID
  );
  expect(missingProfile).toBeUndefined();
  const remainingAfterArtist = await db.all(
    "SELECT * FROM bookings WHERE artist_id = ?",
    artistA.lastID
  );
  expect(remainingAfterArtist.length).toBe(0);

  // Remove event and ensure bookings vanish
  await db.run("DELETE FROM events WHERE id = ?", event.lastID);
  const orphanBookings = await db.all(
    "SELECT * FROM bookings WHERE event_id = ?",
    event.lastID
  );
  expect(orphanBookings.length).toBe(0);

  // Finally delete the club; profile should disappear and no events remain
  await db.run("DELETE FROM users WHERE id = ?", club.lastID);
  const missingClubProfile = await db.get(
    "SELECT * FROM club_profiles WHERE user_id = ?",
    club.lastID
  );
  expect(missingClubProfile).toBeUndefined();
  const clubEvents = await db.all(
    "SELECT * FROM events WHERE club_id = ?",
    club.lastID
  );
  expect(clubEvents.length).toBe(0);
});
