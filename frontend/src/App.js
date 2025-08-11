import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
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
import NavBar from './components/NavBar.js';

// Application root controlling client-side routes and navigation links.
// Each page component below is intentionally lightweight and focuses on
// demonstrating API usage rather than production-ready UX.

function App() {
  return (
    <AuthProvider>
      <Router>
        {/* Responsive navigation component introduced in Phase 4 */}
        <NavBar />
        {/* Route declarations map URLs to page components */}
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
