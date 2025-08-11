import React, { useState } from 'react';
import { useAuth } from '../AuthContext.js';

// Minimal form for venues to create a new event.
function CreateEvent() {
  const { token } = useAuth();
  const [title, setTitle] = useState('');

  // Submit the event to the backend API
  async function submit(e) {
    e.preventDefault();
    await fetch('/events', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ title })
    });
  }

  if (!token) return <p>Please log in</p>;

  return (
    <form onSubmit={submit} className="p-4 space-y-2">
      <input className="border p-2" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
      <button className="bg-blue-500 text-white p-2" type="submit">Create</button>
    </form>
  );
}

export default CreateEvent;
