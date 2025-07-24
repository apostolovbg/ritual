import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Artists() {
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    fetch('/artists').then(res => res.json()).then(setArtists);
  }, []);

  return (
    <div className="p-4 space-y-2">
      {artists.map(a => (
        <div key={a.user_id}>
          {a.user_id}: <Link to={`/profiles/${a.user_id}`}>{a.stage_name}</Link>
        </div>
      ))}
    </div>
  );
}

export default Artists;
