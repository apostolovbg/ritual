import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Responsive navigation bar. On small screens a hamburger button toggles
// the visibility of the link list. Larger screens display links inline.
function NavBar() {
  const [open, setOpen] = useState(false); // track collapsed state

  return (
    <nav className="bg-gray-900 text-white">
      <div className="max-w-4xl mx-auto flex items-center justify-between p-4">
        {/* Logo acts as a home link */}
        <Link to="/" className="font-bold">RITUAL</Link>
        {/* Hamburger icon visible on small screens */}
        <button
          className="sm:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        {/* Navigation links stack vertically on mobile and horizontally on larger screens */}
        <div className={`${open ? 'block' : 'hidden'} sm:flex sm:items-center sm:gap-4 w-full sm:w-auto mt-4 sm:mt-0`}>
          <Link className="block py-2 px-3 hover:text-blue-300" to="/register">Register</Link>
          <Link className="block py-2 px-3 hover:text-blue-300" to="/login">Login</Link>
          <Link className="block py-2 px-3 hover:text-blue-300" to="/profile">Profile</Link>
          <Link className="block py-2 px-3 hover:text-blue-300" to="/artists">Artists</Link>
          <Link className="block py-2 px-3 hover:text-blue-300" to="/venues">Venues</Link>
          <Link className="block py-2 px-3 hover:text-blue-300" to="/events">Events</Link>
          <Link className="block py-2 px-3 hover:text-blue-300" to="/create-event">Create Event</Link>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
