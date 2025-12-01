import React, { useEffect, useState } from 'react';
import API from '../services/api.js';
import Card from '../components/ui/Card.jsx';
import Input from '../components/ui/Input.jsx';
import Textarea from '../components/ui/Textarea.jsx';
import Button from '../components/ui/Button.jsx';
import Badge from '../components/ui/Badge.jsx';

export default function EmployerDashboard() {
  const [jobs, setJobs] = useState([]);
  const [form, setForm] = useState({
    title: '',
    description: '',
    requiredSkills: '',
    location: '',
    jobType: '',
    experienceLevel: '',
    salaryMin: '',
    salaryMax: ''
  });

  const load = async () => setJobs(await API.get('/jobs/me/mine'));
  useEffect(() => { load(); }, []);

  const create = async () => {
    const payload = {
      ...form,
      requiredSkills: form.requiredSkills.split(',').map(s => s.trim()).filter(Boolean),
      salaryMin: Number(form.salaryMin) || null,
      salaryMax: Number(form.salaryMax) || null
    };
    await API.post('/jobs', payload);
    setForm({
      title: '',
      description: '',
      requiredSkills: '',
      location: '',
      jobType: '',
      experienceLevel: '',
      salaryMin: '',
      salaryMax: ''
    });
    await load();
  };

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl font-bold">Employer Dashboard</h2>
        <p className="text-sm text-gray-600">Create job postings and review performance</p>
      </div>

      <Card header="Create Job" className="motion-safe:animate-fade-in">
        <div className="grid gap-3">
          <Input placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          <Textarea placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          <Input placeholder="Required skills (comma)" value={form.requiredSkills} onChange={(e) => setForm({ ...form, requiredSkills: e.target.value })} />

          <div className="grid sm:grid-cols-3 gap-3">
            <Input placeholder="Location" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />
            <Input placeholder="Job Type" value={form.jobType} onChange={(e) => setForm({ ...form, jobType: e.target.value })} />
            <Input placeholder="Experience Level" value={form.experienceLevel} onChange={(e) => setForm({ ...form, experienceLevel: e.target.value })} />
          </div>

          <div className="grid sm:grid-cols-2 gap-3">
            <Input placeholder="Salary Min" value={form.salaryMin} onChange={(e) => setForm({ ...form, salaryMin: e.target.value })} />
            <Input placeholder="Salary Max" value={form.salaryMax} onChange={(e) => setForm({ ...form, salaryMax: e.target.value })} />
          </div>

          <div className="flex justify-end">
            <Button onClick={create} className="btn-gradient">Create</Button>
          </div>
        </div>
      </Card>

      <div>
        <h3 className="text-lg font-semibold mb-2">My Jobs</h3>
        <div className="grid gap-3">
          {jobs.map((j) => {
            // FIX: Parse requiredSkills correctly to remove brackets
            let skills = [];
            if (Array.isArray(j.requiredSkills)) {
              skills = j.requiredSkills;
            } else if (typeof j.requiredSkills === 'string') {
              try {
                const parsed = JSON.parse(j.requiredSkills);
                skills = Array.isArray(parsed) ? parsed : j.requiredSkills.split(',').map(s => s.trim());
              } catch {
                skills = j.requiredSkills.split(',').map(s => s.trim());
              }
            }

            return (
              <Card key={j.id} className="motion-safe:animate-fade-in">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="font-semibold">{j.title}</div>
                    <div className="text-sm text-gray-600">{j.location} • {j.jobType}</div>

                    <div className="mt-2 flex flex-wrap gap-2">
                      {skills.slice(0, 8).map((s, i) => (
                        <Badge key={i} variant="primary">{s}</Badge>
                      ))}
                    </div>
                  </div>

                  <div className="text-xs text-gray-500">Views: {j.views}</div>
                </div>
              </Card>
            );
          })}

          {jobs.length === 0 && (
            <Card>
              <div className="text-sm text-gray-600">No jobs yet. Create your first posting above.</div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
