import React, { useState } from 'react';
import Input from '../components/ui/Input.jsx';
import Select from '../components/ui/Select.jsx';
import Button from '../components/ui/Button.jsx';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('jobseeker');
  const [error, setError] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    const r = await fetch('/api/auth/register', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name, email, password, role }) });
    if (!r.ok) {
      let msg = 'Registration failed';
      try { const data = await r.json(); if (data?.message) msg = data.message; } catch {}
      setError(msg);
      return;
    }
    const data = await r.json();
    localStorage.setItem('fe_token', data.token);
    localStorage.setItem('fe_user', JSON.stringify(data.user));
    window.location.href = role === 'employer' ? '/employer' : role === 'trainer' ? '/trainer' : '/jobseeker';
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="card">
        <div className="px-5 pt-5">
          <h2 className="text-xl font-semibold mb-1">Create your account</h2>
          <p className="text-sm text-gray-600">Choose a role to get started</p>
        </div>
        <form onSubmit={submit} className="p-5 space-y-3">
          <Input label="Full name" placeholder="Jane Doe" value={name} onChange={(e) => setName(e.target.value)} />
          <Input label="Email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
          <Input label="Password" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} />
          <Select label="Role" value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="jobseeker">Job Seeker</option>
            <option value="employer">Employer</option>
            <option value="trainer">Trainer</option>
          </Select>
          <Button className="w-full">Sign up</Button>
          {error && <div className="text-sm text-red-600">{error}</div>}
        </form>
      </div>
    </div>
  );
}
