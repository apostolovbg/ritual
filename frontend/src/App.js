import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom';
import { AuthProvider } from './AuthContext.js';
import Login from './pages/Login.js';
import Register from './pages/Register.js';
import Profile from './pages/Profile.js';
import Events from './pages/Events.js';
import CreateEvent from './pages/CreateEvent.js';
import Artists from './pages/Artists.js';
import Clubs from './pages/Clubs.js';
import PublicProfile from './pages/PublicProfile.js';

function App() {
  return (
    <AuthProvider>
      <Router>
        <nav className="p-2 bg-gray-200 flex gap-2">
          <Link to="/register">Register</Link>
          <Link to="/login">Login</Link>
          <Link to="/profile">Profile</Link>
          <Link to="/artists">Artists</Link>
          <Link to="/venues">Venues</Link>
          <Link to="/events">Events</Link>
          <Link to="/create-event">Create Event</Link>
        </nav>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/artists" element={<Artists />} />
          <Route path="/venues" element={<Clubs />} />
          <Route path="/profiles/:id" element={<PublicProfile />} />
          <Route path="/events" element={<Events />} />
          <Route path="/create-event" element={<CreateEvent />} />
          <Route path="/" element={<Events />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
