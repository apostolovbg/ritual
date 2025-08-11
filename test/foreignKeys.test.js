import { dbPromise } from '../src/app.js';

beforeAll(async () => {
  const db = await dbPromise;
  await db.exec('DELETE FROM bookings');
  await db.exec('DELETE FROM events');
  await db.exec('DELETE FROM artist_profiles');
  await db.exec('DELETE FROM club_profiles');
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
