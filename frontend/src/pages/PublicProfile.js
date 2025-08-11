import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

// Read-only view of a public artist or club profile based on the ID in the URL.
function PublicProfile() {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);

  // Fetch the profile whenever the id param changes
  useEffect(() => {
    fetch(`/profiles/${id}`).then(res => res.json()).then(setProfile);
  }, [id]);

  if (!profile) return <p>Loading...</p>;

  if (profile.role === 'artist') {
    return (
      <div className="p-4">
        <h2>Artist {id}</h2>
        <div>Stage name: {profile.stage_name}</div>
        <div>Country: {profile.country}</div>
        <div>City: {profile.city}</div>
        <div>Bio: {profile.bio}</div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h2>Venue {id}</h2>
      <div>Name: {profile.name}</div>
      <div>Country: {profile.country}</div>
      <div>City: {profile.city}</div>
      <div>About: {profile.about}</div>
    </div>
  );
}

export default PublicProfile;
