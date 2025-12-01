import React, { useEffect, useState } from 'react';
import API from '../services/api.js';
import Card from '../components/ui/Card.jsx';
import Button from '../components/ui/Button.jsx';

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState(null);

  const load = async () => {
    setUsers(await API.get('/admin/users'));
    setStats(await API.get('/admin/analytics'));
  };
  useEffect(() => { load(); }, []);

  const block = async (id, status) => { await API.put(`/admin/users/${id}/status`, { status }); await load(); };

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl font-bold">Admin Dashboard</h2>
        <p className="text-sm text-gray-600">System overview and user management</p>
      </div>
      {stats && (
        <div className="grid sm:grid-cols-3 gap-3">
          <Card><div className="text-sm text-gray-600">Total Jobs</div><div className="text-2xl font-bold">{stats.totalJobs}</div></Card>
          <Card><div className="text-sm text-gray-600">Total Applications</div><div className="text-2xl font-bold">{stats.totalApplications}</div></Card>
          <Card><div className="text-sm text-gray-600">Top Skills</div><div className="text-sm">{stats.popularSkills.map(p=>p.skill).slice(0,5).join(', ') || '—'}</div></Card>
        </div>
      )}
      <Card header="Users">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left text-gray-600">
                <th className="py-2">ID</th>
                <th className="py-2">Name</th>
                <th className="py-2">Email</th>
                <th className="py-2">Role</th>
                <th className="py-2">Status</th>
                <th className="py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map(u => (
                <tr key={u.id} className="border-t border-gray-100">
                  <td className="py-2">{u.id}</td>
                  <td className="py-2">{u.name}</td>
                  <td className="py-2">{u.email}</td>
                  <td className="py-2 capitalize">{u.role}</td>
                  <td className="py-2 capitalize">{u.status}</td>
                  <td className="py-2">
                    {u.status === 'active' ? (
                      <Button variant="secondary" onClick={()=>block(u.id,'blocked')}>Block</Button>
                    ) : (
                      <Button onClick={()=>block(u.id,'active')}>Activate</Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
