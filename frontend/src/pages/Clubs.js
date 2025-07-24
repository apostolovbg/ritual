import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Clubs() {
  const [clubs, setClubs] = useState([]);

  useEffect(() => {
    fetch('/clubs').then(res => res.json()).then(setClubs);
  }, []);

  return (
    <div className="p-4 space-y-2">
      {clubs.map(c => (
        <div key={c.user_id}>
          {c.user_id}: <Link to={`/profiles/${c.user_id}`}>{c.name}</Link>
        </div>
      ))}
    </div>
  );
}

export default Clubs;
