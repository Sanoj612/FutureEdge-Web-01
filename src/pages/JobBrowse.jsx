import React, { useEffect, useState } from 'react';
import Input from '../components/ui/Input.jsx';
import Button from '../components/ui/Button.jsx';
import Card from '../components/ui/Card.jsx';
import Badge from '../components/ui/Badge.jsx';

export default function JobBrowse() {
  const [q, setQ] = useState('');
  const [location, setLocation] = useState('');
  const [skills, setSkills] = useState('');
  const [items, setItems] = useState([]);

  const search = async () => {
    const params = new URLSearchParams();
    if (q) params.set('q', q);
    if (location) params.set('location', location);
    if (skills) params.set('skills', skills);
    const r = await fetch('/api/jobs?' + params.toString());
    const data = await r.json();
    setItems(data.items || []);
  };

  useEffect(() => { search(); }, []);

  return (
    <div className="space-y-4">
      <div className="hero motion-safe:animate-gradient-x p-8 shadow-sm">
        <div className="relative z-10 max-w-2xl">
          <div className="bg-blue-600 rounded-xl p-6 shadow-lg">
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">Find your next role</h1>
            <p className="mt-2 text-white">Discover jobs matched to your skills and experience with AI‑powered recommendations.</p>
          </div>
        </div>
      </div>

      <Card>
        <div className="grid sm:grid-cols-4 gap-3">
          <Input placeholder="Search title" value={q} onChange={(e) => setQ(e.target.value)} />
          <Input placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} />
          <Input placeholder="Skills (comma)" value={skills} onChange={(e) => setSkills(e.target.value)} />
          <Button onClick={search} className="w-full btn-gradient">Search</Button>
        </div>
      </Card>

      <div className="grid gap-3">
        {items.map((j) => {
          // SAFE parsing of requiredSkills
          let parsedSkills = [];
          if (Array.isArray(j.requiredSkills)) {
            parsedSkills = j.requiredSkills;
          } else if (typeof j.requiredSkills === 'string') {
            try {
              const temp = JSON.parse(j.requiredSkills);
              parsedSkills = Array.isArray(temp) ? temp : j.requiredSkills.split(',').map(s => s.trim());
            } catch {
              parsedSkills = j.requiredSkills.split(',').map(s => s.trim());
            }
          }

          return (
            <Card key={j.id} className="motion-safe:animate-fade-in">
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-lg font-semibold">{j.title}</div>
                  <div className="text-sm text-gray-600">{j.location || 'Anywhere'} • {j.jobType || 'N/A'}</div>

                  <div className="mt-2 flex flex-wrap gap-2">
                    {parsedSkills.length > 0
                      ? parsedSkills.slice(0, 8).map((s, i) => <Badge key={i} variant="primary">{s}</Badge>)
                      : <span className="text-sm text-gray-600">No skills listed</span>
                    }
                  </div>
                </div>

                <div className="text-xs text-gray-500">Views: {j.views || 0}</div>
              </div>
            </Card>
          );
        })}

        {items.length === 0 && (
          <Card>
            <div className="text-sm text-gray-600">No jobs found. Try adjusting your filters.</div>
          </Card>
        )}
      </div>
    </div>
  );
}
