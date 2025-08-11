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
    <form onSubmit={submit} className="max-w-sm mx-auto mt-8 p-6 space-y-4 bg-white rounded shadow">
      <input className="w-full border p-2 rounded" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
      <button className="w-full bg-blue-500 hover:bg-blue-600 text-white p-2 rounded" type="submit">Create</button>
    </form>
  );
}

export default CreateEvent;
