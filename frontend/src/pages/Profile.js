import React, { useEffect, useState } from 'react';
import { useAuth } from '../AuthContext.js';

// Profile editor for both artists and clubs. Fields differ depending on role
// but are saved through the same API endpoint.
function Profile() {
  const { token } = useAuth();
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState({});

  // Load account and profile details once a token is available
  useEffect(() => {
    if (!token) return;
    async function load() {
      const me = await fetch('/me', { headers: { Authorization: `Bearer ${token}` } }).then(r => r.json());
      setUser(me);
      const prof = await fetch('/me/profile', { headers: { Authorization: `Bearer ${token}` } }).then(r => r.json());
      setProfile(prof);
    }
    load();
  }, [token]);

  // Local helper to update a single field in the profile state
  function update(field, value) {
    setProfile(p => ({ ...p, [field]: value }));
  }

  // Persist the profile to the backend then reload from the database
  async function save() {
    await fetch('/me/profile', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ email: user.email, ...profile })
    });
    // refresh profile so form shows persisted values
    const prof = await fetch('/me/profile', { headers: { Authorization: `Bearer ${token}` } }).then(r => r.json());
    setProfile(prof);
  }

  if (!token) return <p>Please log in</p>;
  if (!user) return <p>Loading...</p>;

  if (user.role === 'artist') {
    return (
      <div className="p-4 space-y-2">
        <input className="border p-2" placeholder="Email" value={user.email} onChange={e => setUser({ ...user, email: e.target.value })} />
        <input className="border p-2" placeholder="Given name" value={profile.given_name || ''} onChange={e => update('given_name', e.target.value)} />
        <input className="border p-2" placeholder="Father name" value={profile.father_name || ''} onChange={e => update('father_name', e.target.value)} />
        <input className="border p-2" placeholder="Family name" value={profile.family_name || ''} onChange={e => update('family_name', e.target.value)} />
        <input className="border p-2" placeholder="Stage name" value={profile.stage_name || ''} onChange={e => update('stage_name', e.target.value)} />
        <label className="block">
          <input type="checkbox" checked={profile.uses_real_name ? true : false} onChange={e => update('uses_real_name', e.target.checked ? 1 : 0)} /> Use real name
        </label>
        <input className="border p-2" placeholder="Country" value={profile.country || ''} onChange={e => update('country', e.target.value)} />
        <input className="border p-2" placeholder="City" value={profile.city || ''} onChange={e => update('city', e.target.value)} />
        <input className="border p-2" type="date" placeholder="Birth date" value={profile.birth_date || ''} onChange={e => update('birth_date', e.target.value)} />
        <input className="border p-2" placeholder="Genres" value={profile.genres || ''} onChange={e => update('genres', e.target.value)} />
        <textarea className="border p-2" placeholder="Bio" value={profile.bio || ''} onChange={e => update('bio', e.target.value)} />
        <button className="bg-blue-500 text-white p-2" onClick={save}>Save</button>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-2">
      <input className="border p-2" placeholder="Email" value={user.email} onChange={e => setUser({ ...user, email: e.target.value })} />
      <input className="border p-2" placeholder="Name" value={profile.name || ''} onChange={e => update('name', e.target.value)} />
      <input className="border p-2" placeholder="Country" value={profile.country || ''} onChange={e => update('country', e.target.value)} />
      <input className="border p-2" placeholder="City" value={profile.city || ''} onChange={e => update('city', e.target.value)} />
      <input className="border p-2" placeholder="Address" value={profile.address || ''} onChange={e => update('address', e.target.value)} />
      <input className="border p-2" placeholder="Capacity" value={profile.capacity || ''} onChange={e => update('capacity', e.target.value)} />
      <input className="border p-2" placeholder="Genres" value={profile.genres || ''} onChange={e => update('genres', e.target.value)} />
      <input className="border p-2" placeholder="Hours" value={profile.hours || ''} onChange={e => update('hours', e.target.value)} />
      <textarea className="border p-2" placeholder="About" value={profile.about || ''} onChange={e => update('about', e.target.value)} />
      <button className="bg-blue-500 text-white p-2" onClick={save}>Save</button>
    </div>
  );
}

export default Profile;
