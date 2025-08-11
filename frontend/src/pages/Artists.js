import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// Displays a list of all artist profiles with links to their public pages.
function Artists() {
  const [artists, setArtists] = useState([]);

  // Fetch list on mount
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
