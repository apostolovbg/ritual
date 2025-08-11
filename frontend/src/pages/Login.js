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
      className="p-4 space-y-2"
    >
      {/* Controlled inputs keep component state in sync with form fields */}
      <input className="border p-2" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <input className="border p-2" type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
      <button className="bg-blue-500 text-white p-2" type="submit">Login</button>
    </form>
  );
}

export default Login;
