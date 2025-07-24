import React, { useEffect, useState } from 'react';
import { useAuth } from '../AuthContext.js';

function Events() {
  const { token } = useAuth();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch('/events')
      .then(res => res.json())
      .then(setEvents);
  }, []);

  async function book(event) {
    await fetch('/bookings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ club_id: event.club_id, event_id: event.id })
    });
  }

  return (
    <div className="p-4 space-y-2">
      {events.map(e => (
        <div key={e.id} className="border p-2">
          <p>{e.title}</p>
          {token && <button className="bg-blue-500 text-white p-1" onClick={() => book(e)}>Book</button>}
        </div>
      ))}
    </div>
  );
}

export default Events;
