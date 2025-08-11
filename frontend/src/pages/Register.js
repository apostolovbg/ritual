import React, { useState } from 'react';
import { useAuth } from '../AuthContext.js';

// Registration form collecting user credentials and desired role.
function Register() {
  const { register } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('artist');

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        register(email, password, role); // Create account then log in
      }}
      className="max-w-sm mx-auto mt-8 p-6 space-y-4 bg-white rounded shadow"
    >
      <input className="w-full border p-2 rounded" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <input className="w-full border p-2 rounded" type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
      {/* Role selector determines which profile table is initialized */}
      <select className="w-full border p-2 rounded" value={role} onChange={e => setRole(e.target.value)}>
        <option value="artist">Artist</option>
        <option value="club">Club</option>
      </select>
      <button className="w-full bg-blue-500 hover:bg-blue-600 text-white p-2 rounded" type="submit">Register</button>
    </form>
  );
}

export default Register;
