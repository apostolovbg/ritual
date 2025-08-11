import React, { createContext, useState, useEffect, useContext } from 'react';

// Context wrapper managing authentication state for the demo frontend.
// Tokens are stored in localStorage so they persist across refreshes.
const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);

  // On mount, read any previously saved token to keep users logged in
  useEffect(() => {
    const stored = localStorage.getItem('token');
    if (stored) setToken(stored);
  }, []);

  // Call the API login endpoint and persist the returned JWT
  async function login(email, password) {
    const res = await fetch('/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    if (res.ok) {
      const data = await res.json();
      localStorage.setItem('token', data.access_token);
      setToken(data.access_token);
    } else {
      throw new Error('login failed');
    }
  }

  // Registration is followed immediately by a login to reuse logic above
  async function register(email, password, role) {
    await fetch('/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, role })
    });
    return login(email, password);
  }

  // Simple logout clears the token from state and storage
  async function logout() {
    localStorage.removeItem('token');
    setToken(null);
  }

  return (
    <AuthContext.Provider value={{ token, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
