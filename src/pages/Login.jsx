import React, { useState } from 'react';
import Input from '../components/ui/Input.jsx';
import Button from '../components/ui/Button.jsx';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    const r = await fetch('/api/auth/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, password }) });
    if (!r.ok) {
      let msg = 'Login failed';
      try { const data = await r.json(); if (data?.message) msg = data.message; } catch {}
      setError(msg);
      return;
    }
    const data = await r.json();
    localStorage.setItem('fe_token', data.token);
    localStorage.setItem('fe_user', JSON.stringify(data.user));
    const role = data.user.role;
    window.location.href = role === 'employer' ? '/employer' : role === 'trainer' ? '/trainer' : role === 'admin' ? '/admin' : '/jobseeker';
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="card">
        <div className="px-5 pt-5">
          <h2 className="text-xl font-semibold mb-1">Welcome back</h2>
          <p className="text-sm text-gray-600">Sign in to your account</p>
        </div>
        <form onSubmit={submit} className="p-5 space-y-3">
          <Input label="Email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
          <Input label="Password" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} />
          <Button className="w-full">Login</Button>
          {error && <div className="text-sm text-red-600">{error}</div>}
        </form>
      </div>
    </div>
  );
}
