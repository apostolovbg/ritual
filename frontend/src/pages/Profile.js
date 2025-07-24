import React, { useEffect, useState } from 'react';
import { useAuth } from '../AuthContext.js';

function Profile() {
  const { token } = useAuth();
  const [profile, setProfile] = useState({});

  useEffect(() => {
    if (!token) return;
    fetch('/me', { headers: { Authorization: `Bearer ${token}` } })
      .then(res => res.json())
      .then(setProfile);
  }, [token]);

  function update(field, value) {
    setProfile(p => ({ ...p, [field]: value }));
  }

  async function save() {
    await fetch('/me/profile', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(profile)
    });
  }

  if (!token) return <p>Please log in</p>;

  return (
    <div className="p-4 space-y-2">
      <input className="border p-2" placeholder="Bio" value={profile.bio || ''} onChange={e => update('bio', e.target.value)} />
      <button className="bg-blue-500 text-white p-2" onClick={save}>Save</button>
    </div>
  );
}

export default Profile;
