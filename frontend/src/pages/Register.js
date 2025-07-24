import React, { useState } from 'react';
import { useAuth } from '../AuthContext.js';

function Register() {
  const { register } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('artist');

  return (
    <form onSubmit={e => { e.preventDefault(); register(email, password, role); }} className="p-4 space-y-2">
      <input className="border p-2" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <input className="border p-2" type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
      <select className="border p-2" value={role} onChange={e => setRole(e.target.value)}>
        <option value="artist">Artist</option>
        <option value="club">Club</option>
      </select>
      <button className="bg-blue-500 text-white p-2" type="submit">Register</button>
    </form>
  );
}

export default Register;
