import React, { useEffect, useState } from 'react';
import API from '../services/api.js';
import Card from '../components/ui/Card.jsx';
import Input from '../components/ui/Input.jsx';
import Textarea from '../components/ui/Textarea.jsx';
import Button from '../components/ui/Button.jsx';

export default function TrainerDashboard() {
  const [courses, setCourses] = useState([]);
  const [form, setForm] = useState({ title: '', description: '', skillTags: '', level: '', content: '' });
  const [slot, setSlot] = useState('');
  const [slots, setSlots] = useState([]);

  const load = async () => {
    setCourses(await API.get('/courses'));
    setSlots(await API.get('/courses/mentorship/slots'));
  };
  useEffect(() => { load(); }, []);

  const create = async () => {
    const payload = { ...form, skillTags: form.skillTags.split(',').map(s=>s.trim()).filter(Boolean) };
    await API.post('/courses', payload);
    setForm({ title: '', description: '', skillTags: '', level: '', content: '' });
    await load();
  };
  const addSlot = async () => { await API.post('/courses/mentorship/slots', { timeSlot: slot }); setSlot(''); await load(); };

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl font-bold">Trainer Dashboard</h2>
        <p className="text-sm text-gray-600">Publish courses and manage mentorship availability</p>
      </div>
      <Card header="Create Course" className="motion-safe:animate-fade-in">
        <div className="grid gap-3">
          <Input placeholder="Title" value={form.title} onChange={(e)=>setForm({...form,title:e.target.value})} />
          <Textarea placeholder="Description" value={form.description} onChange={(e)=>setForm({...form,description:e.target.value})} />
          <div className="grid sm:grid-cols-2 gap-3">
            <Input placeholder="Skill tags (comma)" value={form.skillTags} onChange={(e)=>setForm({...form,skillTags:e.target.value})} />
            <Input placeholder="Level" value={form.level} onChange={(e)=>setForm({...form,level:e.target.value})} />
          </div>
          <Textarea placeholder="Content (links, details)" value={form.content} onChange={(e)=>setForm({...form,content:e.target.value})} />
          <div className="flex justify-end"><Button onClick={create} className="btn-gradient">Create</Button></div>
        </div>
      </Card>
      <div>
        <h3 className="text-lg font-semibold mb-2">My Courses</h3>
        <div className="grid gap-3">
          {courses.map((c) => (
            <Card key={c.id} className="motion-safe:animate-fade-in">
              <div className="font-semibold">{c.title}</div>
              <div className="text-sm text-gray-600">Skills: {(c.skillTags || []).join(', ') || '—'}</div>
            </Card>
          ))}
          {courses.length === 0 && <Card><div className="text-sm text-gray-600">No courses yet. Create one above.</div></Card>}
        </div>
      </div>
      <Card header="Mentorship Slots" className="motion-safe:animate-fade-in">
        <div className="flex flex-col sm:flex-row gap-3 items-start">
          <Input placeholder="YYYY-MM-DDTHH:mm:ssZ" value={slot} onChange={(e)=>setSlot(e.target.value)} />
          <Button onClick={addSlot}>Add Slot</Button>
        </div>
        <ul className="mt-3 space-y-1 text-sm">
          {slots.map(s => (<li key={s.id}>{new Date(s.timeSlot).toLocaleString()} {s.isBooked ? '• Booked' : ''}</li>))}
        </ul>
      </Card>
    </div>
  );
}
