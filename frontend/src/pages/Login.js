import React, { useState } from 'react';
import { useAuth } from '../AuthContext.js';

// Simple login form that delegates authentication to AuthContext.
function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        login(email, password); // Attempt login with provided credentials
      }}
      className="max-w-sm mx-auto mt-8 p-6 space-y-4 bg-white rounded shadow"
    >
      {/* Controlled inputs keep component state in sync with form fields */}
      <input className="w-full border p-2 rounded" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <input className="w-full border p-2 rounded" type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
      <button className="w-full bg-blue-500 hover:bg-blue-600 text-white p-2 rounded" type="submit">Login</button>
    </form>
  );
}

export default Login;
